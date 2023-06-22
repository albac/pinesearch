import { Post } from "@/models";
import { SortDirection, Storage, withSSRContext } from "aws-amplify";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const { DataStore } = withSSRContext();
  const posts = await DataStore.query(Post, (c: any) => c, {
    sort: (s: any) => s.updatedAt(SortDirection.DESCENDING)
  });

  return posts.map((post: any) => ({
    slug: post.s3url
  }));
}

export const revalidate = 30;

export default async function blogPage({ params }: { params: any }) {
  const file = await Storage.get(`${params.slug}.mdx`, {
    level: "public"
  });
  const data = await (await fetch(file)).text();

  return (
    <div>
      <article className="prose py-10 w-[90%] mx-auto">
        <MDXRemote source={data} />
      </article>
    </div>
  );
}
