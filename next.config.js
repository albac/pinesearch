/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    USER_BRANCH: process.env.USER_BRANCH,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    NOT_LOCAL: process.env.NOT_LOCAL
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          process.env.DOPPLER_ENVIRONMENT === "stg"
            ? "pineblogs101145-dev.s3.us-west-2.amazonaws.com"
            : "pineblogs180855-local.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/public/**"
      }
    ]
  }
};

module.exports = nextConfig;
