import { Post as PostModel } from "@/models";
import { SortDirection, Storage, withSSRContext } from "aws-amplify";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ImageClient } from "@/components/ImageClient";
import { Buttons } from "./Buttons";

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
    title: `PineSearch - ${post[0].title}`,
    description: post[0].summary
  };
}

export const revalidate: number = 30;

export default async function blogPage({ params }: BlogPageParams) {
  const [mdxFile, audio_src] = await Promise.allSettled([
    Storage.get(`mdx/${params.slug}.md`, { level: "public" }),
    Storage.get(`${params.slug}.wav`, { level: "public" })
  ]);

  if (audio_src.status === "fulfilled" && mdxFile.status === "fulfilled") {
    const voice = audio_src.value;
    const mdxSource = await (await fetch(mdxFile.value)).text();

    return (
      <div className="py-4">
        <section className="w-[90%] max-w-[806px] mx-auto">
          <ImageClient
            className="w-full object-fills object-center h-[300px] rounded-md"
            width={300}
            height={300}
            imageName={params.slug}
            alt={`ia-image by ${params.slug}`}
          />

          <Buttons voice={voice} slug={params.slug} />

          <article
            className="
          max-w-none
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
            <MDXRemote source={mdxSource} />
          </article>
        </section>
      </div>
    );
  } else {
    return <div>error</div>;
  }
}
