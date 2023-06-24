/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    USER_BRANCH: process.env.USER_BRANCH,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_OUT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_OUT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    TEST_DEPLOY: process.env.TEST_DEPLOY
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pineblogs101145-dev.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/public/**"
      }
    ]
  }
};

module.exports = nextConfig;
