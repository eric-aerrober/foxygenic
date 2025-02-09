module.exports = {
    env: {
        PROD_URL: process.env.PROD_URL,
        DEV_URL: process.env.DEV_URL,
    },
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["avatars.githubusercontent.com"],
    },
};
