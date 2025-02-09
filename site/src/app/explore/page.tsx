import { scanRepositories } from "../../pages/api/_resources";
import { PageClient } from "./page-client";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
    const repos = await scanRepositories();
    return <PageClient repositories={repos} />;
}
