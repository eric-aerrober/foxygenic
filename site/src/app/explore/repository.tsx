"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { RepositoryRecord } from "~/types";

interface RepositoryProps {
    repository: RepositoryRecord;
}

export default function Repository({ repository }: RepositoryProps) {
    return (
        <div
            onClick={() => window.open(repository.repoUrl, "_blank")}
            key={repository.repoId}
            className="flex items-start gap-4 group border md:border-transparent hover:border-gray-200 p-2 rounded hover:shadow-lg transition-all duration-300 cursor-pointer text-xs md:text-base"
        >
            <div className="flex-shrink-0">
                {repository.userLogo && <Image src={repository.userLogo} alt="" width={40} height={40} className="rounded-lg" />}
                {!repository.userLogo && <div className="w-8 h-8 rounded-lg bg-gray-200 text-center pt-1 text-gray-400">?</div>}
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center min-w-0">
                        <h3 className="text-lg font-medium lowercase truncate">{repository.repoName}</h3>
                    </div>
                    <div className="flex items-center gap-2 hidden md:flex flex-shrink-0">
                        <Star size={20} />
                        <span>{repository.stars}</span>
                    </div>
                </div>
                <p className="text-gray-600 mt-1 line-clamp-2">{repository.repoDescription}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                    {repository.topics.slice(0, 5).map((tag: string) => (
                        <span key={tag} className="text-xs text-white bg-yellow-500 px-3 py-1 rounded-sm capitalize">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
