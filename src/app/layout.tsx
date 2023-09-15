import awsconfig from "../aws-exports";
import { Amplify } from "aws-amplify";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import AuthenticatorProvider from "@/components/AuthenticatorProvider";

if (process.env.USER_BRANCH === "dev") {
  awsconfig.oauth.redirectSignIn = "http://localhost:3000/";
  awsconfig.oauth.redirectSignOut = "http://localhost:3000/";
} else {
  awsconfig.oauth.redirectSignIn = "https://www.pinesearch.io/";
  awsconfig.oauth.redirectSignOut = "https://www.pinesearch.io/";
}

Amplify.configure({ ...awsconfig, ssr: true });

export const metadata = {
  title: "PineSearch",
  description: "Generated blogs"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-inter">
        <AuthenticatorProvider>
          <Navbar />
          {children}
        </AuthenticatorProvider>
      </body>
    </html>
  );
}
