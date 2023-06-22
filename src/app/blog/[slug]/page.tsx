import { Post as PostModel } from "@/models";
import { SortDirection, Storage, withSSRContext } from "aws-amplify";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

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
  const [mdxFile, imageUrl] = await Promise.allSettled([
    Storage.get(`${params.slug}.mdx`, { level: "public" }),
    Storage.get(`${params.slug}.webp`, { level: "public" })
  ]);

  if (mdxFile.status === "fulfilled" && imageUrl.status === "fulfilled") {
    const mdxSource = await (await fetch(mdxFile.value)).text();
    const imageSrc = imageUrl.value;

    return (
      <div className="bg-gray-50 pt-4">
        <section className="w-[90%] max-w-[806px] mx-auto bg-white rounded-lg overflow-hidden">
          <Image
            className="w-full object-fills object-center h-[300px]"
            width={300}
            height={300}
            src={imageSrc}
            alt={`ia-image by ${params.slug}`}
          />
          <article className="prose py-8 px-16">
            <MDXRemote source={mdxSource} />
          </article>
        </section>
      </div>
    );
  } else {
    return <div>error</div>;
  }
}
