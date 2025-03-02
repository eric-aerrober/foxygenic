import { Octokit } from "@octokit/rest";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { GithubMetadata, SfdxProject } from "~/types";
import { putRepository } from "./_resources";
import { InvalidRepositoryUrlError, NotSalesforceProjectError, PackageNotFoundError } from "./errors";

const SFDX_PROJECT_PATH = "sfdx-project.json";

interface ContentResponse {
    data: {
        content: string;
    };
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        await handle(req.body);
        res.status(200).json({ message: "Repository added successfully" });
    } catch (error) {
        const errorResponse = (() => {
            switch (error?.constructor?.name) {
                case "InvalidRepositoryUrlError":
                    return { status: 400, message: "Invalid repository URL" };
                case "NotSalesforceProjectError":
                    return { status: 400, message: "This repository is not a Salesforce project" };
                case "UnableToValidateSalesforceProjectError":
                    return { status: 400, message: "Unable to validate this is a Salesforce project" };
                case "UnableToRegisterRepositoryError":
                    return { status: 500, message: "Unable to register repository" };
                default:
                    return { status: 500, message: "Internal server error" };
            }
        })();
        res.status(errorResponse.status).json({ message: errorResponse.message });
    }
}

async function handle({ githubUrl }: { githubUrl: string }) {
    // Get the repo from github
    const repositoryData = await getGithubRepoMetadata(githubUrl);

    // Get the list of files in the repo
    const gitTree = await getGitTree(repositoryData);

    // Verify the repo is a Salesforce project
    verifySalesforceRepository(gitTree);

    let latestPackageVersionId: string | undefined;
    try {
        latestPackageVersionId = await getSfdxProject(repositoryData);
    } catch (error) {
        if (error instanceof PackageNotFoundError) {
            // nothing to really do here
        } else {
            // don't fail, in the future we might log this or something
        }
    }

    // Save the repo to the database
    await persistRepository(repositoryData, latestPackageVersionId);
}

async function getSfdxProject(repo: GithubMetadata) {
    const octokit = new Octokit();
    let content: string;
    try {
        const contentResp = (await octokit.repos.getContent({
            owner: repo.owner.login,
            repo: repo.name,
            path: SFDX_PROJECT_PATH,
        })) as ContentResponse;
        content = contentResp.data.content;
    } catch (error) {
        throw new PackageNotFoundError();
    }

    const projectData: SfdxProject = JSON.parse(Buffer.from(content, "base64").toString("utf-8"));
    if (!projectData.packageAliases) {
        throw new PackageNotFoundError();
    }

    // Get the last entry in packageAliases
    const aliases = Object.entries(projectData.packageAliases);
    if (aliases.length === 0) {
        throw new PackageNotFoundError();
    }

    const [_, packageVersionId] = aliases[aliases.length - 1];
    return packageVersionId;
}

async function getGithubRepoMetadata(githubUrl: string): Promise<GithubMetadata> {
    try {
        const octokit = new Octokit();
        const { data } = await octokit.repos.get({
            owner: githubUrl.split("/")[3],
            repo: githubUrl.split("/")[4],
        });
        return data;
    } catch (error) {
        throw new InvalidRepositoryUrlError();
    }
}

async function getGitTree(repo: GithubMetadata) {
    const octokit = new Octokit();
    const { data } = await octokit.git.getTree({
        owner: repo.owner.login,
        repo: repo.name,
        tree_sha: repo.default_branch,
        recursive: "true",
    });

    return data.tree.filter((entry) => !!entry.path).map((entry) => entry.path!);
}

function verifySalesforceRepository(paths: string[]) {
    const salesforcePaths = [".forceignore", SFDX_PROJECT_PATH, "package.xml", "classes/", "triggers/", "aura/", "lwc/", "objects/"];

    let numberOfIdentifiers = 0;
    for (const gitTreeEntry of paths) {
        for (const salesforcePath of salesforcePaths) {
            if (gitTreeEntry.includes(salesforcePath)) {
                numberOfIdentifiers++;
            }
        }
    }

    if (numberOfIdentifiers < 3) {
        throw new NotSalesforceProjectError();
    }
}

async function persistRepository(data: GithubMetadata, latestPackageVersionId: string | undefined) {
    const { stargazers_count, full_name, description, topics } = data;
    const userProfilePicture = data.owner.avatar_url;
    await putRepository({
        repoUrl: data.html_url,
        repoName: full_name,
        repoDescription: description || "",
        repoId: crypto.createHash("sha256").update(data.url).digest("hex"),
        stars: stargazers_count,
        uploadTime: new Date().toISOString(),
        userLogo: userProfilePicture,
        topics: topics || [],
        latestPackageVersionId,
    });
}
