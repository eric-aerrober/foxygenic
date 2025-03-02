"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import Repository from "~/app/explore/repository";
import { RepositoryRecord } from "~/types";

interface PageClientProps {
    repositories: RepositoryRecord[];
}

export function PageClient({ repositories }: PageClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const filteredRepositories = repositories
        .filter((repo) => JSON.stringify(repo).toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (sortOrder === "asc" ? a.stars - b.stars : b.stars - a.stars));

    return (
        <div className="max-w-4xl py-8 mx-auto">
            <div className="flex justify-between items-center mb-4 mx-2">
                <h2 className="text-2xl font-bold">Explore Open Source Salesforce Packages</h2>
            </div>
            <div className="mb-4 flex justify-between items-center mx-2">
                <div className="relative w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Search repositories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded-sm w-full pl-10"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="items-center space-x-2 hidden md:block ">
                    <span className="text-gray-700">Sort by stars:</span>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                        className="p-2 border border-gray-300 rounded-sm"
                    >
                        <option value="asc">Fewest Stars</option>
                        <option value="desc">Most Stars</option>
                    </select>
                </div>
            </div>
            <div className="space-y-6 mx-2">
                {filteredRepositories.map((repo) => (
                    <Repository key={repo.repoId} repository={repo} />
                ))}
            </div>
        </div>
    );
}
