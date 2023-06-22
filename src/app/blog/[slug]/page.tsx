import { Post as PostModel } from "@/models";
import { SortDirection, Storage, withSSRContext } from "aws-amplify";
import { MDXRemote } from "next-mdx-remote/rsc";

interface StaticParams {
  slug: string;
}

interface BlogPageParams {
  params: {
    slug: string;
  };
}

interface Post {
  title: string;
  summary: string;
  s3url: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  const { DataStore } = withSSRContext();
  const posts = await DataStore.query(PostModel, (c: Post) => c, {
    sort: (s: any) => s.updatedAt(SortDirection.DESCENDING)
  });

  return posts.map((post: Post) => ({
    slug: post.s3url
  }));
}

export async function generateMetadata({ params }: BlogPageParams) {
  const { DataStore } = withSSRContext();
  const post = await DataStore.query(PostModel, (c: any) => c.s3url.eq(params.slug));

  if (!post || !post[0]?.title) {
    return null;
  }

  return {
    title: post[0].title,
    description: post[0].summary
  };
}

export const revalidate: number = 30;

export default async function blogPage({ params }: BlogPageParams) {
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
