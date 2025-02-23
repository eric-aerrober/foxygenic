"use client";
import { Check, Copy, Download, ExternalLink, Star, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { RepositoryRecord } from "~/types";

interface RepositoryProps {
    repository: RepositoryRecord;
}

const getInstallCommand = (latestPackageVersionId: string) => {
    return `sf package install -p ${latestPackageVersionId}`;
};

export default function Repository({ repository }: RepositoryProps) {
    const [showInstallCommand, setShowInstallCommand] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleCopy = async () => {
        const command = getInstallCommand(repository.latestPackageVersionId!);
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            key={repository.repoId}
            className="flex items-start gap-4 group md:border-transparent p-2 rounded transition-colors duration-300 text-xs md:text-base"
        >
            <div className="flex-shrink-0">
                {repository.userLogo && <Image src={repository.userLogo} alt="" width={40} height={40} className="rounded-lg" />}
                {!repository.userLogo && <div className="w-8 h-8 rounded-lg bg-gray-200 text-center pt-1 text-gray-400">?</div>}
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center min-w-0 gap-2">
                        <h3 className="text-lg font-medium lowercase truncate">{repository.repoName}</h3>
                        <a
                            href={repository.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500"
                            title="Open repository"
                        >
                            <ExternalLink size={20} />
                        </a>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {repository.latestPackageVersionId && (
                            <button 
                                className="text-blue-500"
                                onClick={() => setShowInstallCommand(true)}
                                title="Show install command"
                            >
                                <Download size={20} />
                            </button>
                        )}
                        <div className="items-center gap-2 hidden md:flex">
                            <Star size={20} />
                            <span>{repository.stars}</span>
                        </div>
                        {repository.latestPackageVersionId && showInstallCommand && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg relative w-[600px]">
                                    <button 
                                        className="absolute top-2 right-2 text-gray-500"
                                        onClick={() => setShowInstallCommand(false)}
                                    >
                                        <X size={20} />
                                    </button>
                                    <h3 className="text-lg font-medium mb-4">Installation Latest Version</h3>
                                    <div className="relative">
                                        <code className="text-sm bg-gray-100 p-3 rounded block">
                                            {getInstallCommand(repository.latestPackageVersionId!)}
                                        </code>
                                        <button
                                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                            onClick={handleCopy}
                                            title="Copy to clipboard"
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
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
