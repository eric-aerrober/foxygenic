import { RestEndpointMethodTypes } from "@octokit/rest";

export type GithubMetadata = RestEndpointMethodTypes["repos"]["get"]["response"]["data"];

export interface PackageDirectory {
    package: string;
    default: boolean;
}

export interface RepositoryRecord {
    repoId: string;
    repoUrl: string;
    repoName: string;
    repoDescription: string;
    stars: number;
    topics: string[];
    userLogo?: string;
    uploadTime: string;
    latestPackageVersionId?: string;
}

export interface SfdxProjectConfig {
    packageDirectories?: Array<{ path?: string }>;
    // Add other potential properties if needed
}

export interface SfdxProject {
    name?: string;
    packageDirectories: PackageDirectory[];
    packageAliases?: {
        [alias: string]: string;
    };
}
