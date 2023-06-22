import { ClerkProvider } from "@clerk/nextjs";
import awsconfig from "../aws-exports";
import { Amplify } from "aws-amplify";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

Amplify.configure(awsconfig);

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
