import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Analytics />
                <Toaster position="top-center" />
                <div className="min-h-screen max-w-[1200px] mx-auto">
                    <header className="py-6 px-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/logo.png" alt="Foxygen Logo" width={40} height={40} className="w-10 h-10" />
                            <span className="text-xl font-medium  hidden md:block">Foxygen</span>
                        </Link>
                        <nav className="flex gap-6">
                            <Link href="/explore" className="text-gray-600 hover:text-orange-800">
                                Explore
                            </Link>
                            <Link href="/add" className="text-gray-600 hover:text-orange-800 px-2 rounded  hidden md:block">
                                Submit Project
                            </Link>
                            <Link href="/add" className="text-gray-600 hover:text-orange-800 px-2 rounded block md:hidden">
                                Submit
                            </Link>
                            <Link href="/about" className="text-gray-600 hover:text-orange-800 px-2 rounded">
                                About
                            </Link>
                        </nav>
                    </header>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
