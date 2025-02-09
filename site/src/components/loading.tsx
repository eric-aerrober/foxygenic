import Image from "next/image";

interface LoadingProps {
    isLoading: boolean;
}

export function Loading({ isLoading }: LoadingProps) {
    if (!isLoading) {
        return null;
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <div className="text-xl font-medium animate-pulse">
                <Image src="/transparent.png" alt="Loading" width={32} height={32} />
            </div>
            <div
                className="absolute animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-300"
                style={{ top: "calc(50% - 32px)", left: "calc(50% - 32px)", animationDuration: "2s" }}
            ></div>
        </div>
    );
}
