"use client";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-3">What is Foxygen?</h2>
                    <p className="text-gray-600">
                        Foxygen is a Salesforce package manager that makes it easy to share and install Salesforce packages. Our goal is to streamline the
                        process of package distribution and installation within the Salesforce ecosystem.
                    </p>
                    <br />
                    <p className="text-gray-600">
                        Foxygen is built by developers, for developers. We believe in making Salesforce package management simple and efficient. Join us in
                        improving the Salesforce development experience.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Future Plans</h2>
                    <div className="space-y-4">
                        <div className="rounded-lg">
                            <ul className="list-disc list-inside text-gray-600 pl-4">
                                <li>Generate install links directly from sfdx-project.json files</li>
                                <li>Automated package version detection and history</li>
                                <li>Rendering of readme.md files for each package</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Release Log</h2>
                    <div className="space-y-4">
                        <div className="border border-gray-200 mb-4 bg-gray-50 rounded-lg p-2 px-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium mb-2">v0.0.1</h3>
                                <pre className="text-xs text-gray-500">2025-02-09</pre>
                            </div>
                            <ul className="list-disc list-inside text-gray-600 pl-4">
                                <li>
                                    Initial release of Foxygen website!{" "}
                                    <a href="https://foxygenic.com/" className="text-blue-500">
                                        https://foxygenic.com/
                                    </a>
                                </li>
                                <li>Basic package registration and discovery through website</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
