import { Storage } from "aws-amplify";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata: Metadata = {
  title: "PineSearch - How it work",
  description: "How it work PineSearch"
};

export default async function page() {
  const mdFile = await Storage.get("mdx/how-does.md", {
    level: "public"
  });

  const mdSource = await (await fetch(mdFile)).text();
  return (
    <div className="w-[90%] max-w-[806px] mx-auto">
      <article
        className="max-w-none
      overflow-hidden
      prose
      prose-headings:font-poping
      prose-p:font-pt_serif
          prose-headings:leading-tight
          prose-h1:text-3xl
          prose-h1:text-center
          prose-h1:mb-10
          prose-h2:text-[27px]
          prose-h2:my-[10px]
          prose-p:m-0
          prose-p:mb-4
          prose-p:text-lg 
          lg:prose-p:text-xl
          lg:prose-p:mb-5
          md:prose-h1:text-4xl
          lg:prose-h2:text-3xl
          lg:prose-h1:text-5xl
          px-4
          py-4
          sm:px-8
          md:py-6
          md:px-12
          lg:py-8
          lg:px-16"
      >
        <MDXRemote source={mdSource} />
      </article>
    </div>
  );
}
