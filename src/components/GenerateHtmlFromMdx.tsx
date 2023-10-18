import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";

interface Props {
  source: string;
}

export const GenerateHtmlFromMdx = ({ source }: Props) => {
  return (
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
      <MDXRemote source={source} />
    </article>
  );
};
