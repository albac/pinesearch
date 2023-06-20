"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export function MdxRemoteClient({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) {
  return (
    <article className="prose py-5 w-[90%] mx-auto">
      <MDXRemote {...mdxSource} />
    </article>
  );
}
