import { ClerkProvider } from "@clerk/nextjs";
import awsconfig from "../aws-exports";
import { Amplify } from "aws-amplify";
import "./globals.css";
import Navbar from "./Navbar";

Amplify.configure(awsconfig);

export const metadata = {
  title: "PineSearch",
  description: "Generated blogs"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="font-inter">
          <Navbar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
