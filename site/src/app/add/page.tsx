"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loading } from "~/components/loading";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState("");

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ githubUrl: url }),
            });
            if (response.ok) {
                toast.success("Repository registered successfully");
                router.push("/");
            } else {
                const resp = await response.json();
                toast.error(resp.message);
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Loading isLoading={isLoading} />
            <div className="max-w-xl mx-auto px-4 py-16">
                <h1 className="text-2xl font-medium mb-8">Register Your Repository</h1>
                <label htmlFor="url" className="block text-sm text-gray-600 mb-2">
                    Repository URL
                </label>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    placeholder="https://github.com/username/repository"
                    className="w-full px-3 py-2 bg-gray-50 focus:bg-white rounded border border-gray-200 mb-2"
                />
                <button className="px-4 py-1 bg-gray-900 text-white hover:bg-gray-800 rounded" onClick={handleSubmit}>
                    Register
                </button>
            </div>
        </div>
    );
}
