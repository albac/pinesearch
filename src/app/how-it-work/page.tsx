import { GenerateHtmlFromMdx } from "@/components/GenerateHtmlFromMdx";
import { Storage } from "aws-amplify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PineSearch - How it work",
  description: "How it work PineSearch"
};

export default async function page() {
  const mdFile = await Storage.get("mdx/how-does.md", {
    level: "public"
  });

  const mdSource = await (await fetch(mdFile)).text();

  return <GenerateHtmlFromMdx source={mdSource} />;
}
