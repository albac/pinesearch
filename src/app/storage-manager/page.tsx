"use client";

import { StorageManager as Uploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "../../aws-exports";
import { Amplify } from "aws-amplify";

Amplify.configure(awsconfig);

export default function page() {
  return (
    <div className="mt-10 px-4 w-screen max-w-[90%] mx-auto text-xs">
      <Uploader accessLevel="public" acceptedFileTypes={[".mdx", "image/*"]} maxFileCount={5} />
    </div>
  );
}
