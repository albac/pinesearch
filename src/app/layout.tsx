import awsconfig from "../aws-exports";
import { Amplify } from "aws-amplify";
import "./globals.css";
import Navbar from "./Navbar";
import AuthenticatorProvider from "@/components/AuthenticatorProvider";

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
