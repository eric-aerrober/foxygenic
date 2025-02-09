import { Octokit } from "@octokit/rest";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { putRepository } from "./_resources";
import { InvalidRepositoryUrlError, NotSalesforceProjectError } from "./errors";
import { GithubMetadata } from "~/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        await handle(req.body);
        res.status(200).json({ message: "Repository added successfully" });
    } catch (error) {
        console.error(error);
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
    const repositoryData = await getGithubRepoMetdata(githubUrl);

    // Get the list of files in the repo
    const gitTree = await getGitTree(repositoryData);

    // Verify the repo is a Salesforce project
    verifySalesforceRepository(gitTree);

    // Save the repo to the database
    await persistRepository(repositoryData);
}

async function getGithubRepoMetdata(githubUrl: string): Promise<GithubMetadata> {
    try {
        const octokit = new Octokit();
        const { data } = await octokit.repos.get({
            owner: githubUrl.split("/")[3],
            repo: githubUrl.split("/")[4],
        });
        return data;
    } catch (error) {
        console.error(error);
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
    const salesforcePaths = [".forceignore", "sfdx-project.json", "package.xml", "classes/", "triggers/", "aura/", "lwc/", "objects/"];

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

async function persistRepository(data: GithubMetadata) {
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
    });
}
