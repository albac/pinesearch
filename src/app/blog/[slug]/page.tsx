import { Post as PostModel } from "@/models";
import { SortDirection, Storage, withSSRContext } from "aws-amplify";
import { ImageClient } from "@/components/Image/ImageClient";
import { ButtonsBar } from "./ButtonsBar";
import { Metadata } from "next";
import { GenerateHtmlFromMdx } from "@/components/GenerateHtmlFromMdx";

interface StaticParams {
  slug: string;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  const { DataStore } = withSSRContext();

  const posts = await DataStore.query(PostModel, (c: PostModel) => c, {
    sort: (s: any) => s.updatedAt(SortDirection.DESCENDING)
  });

  return posts.map((post: PostModel) => ({
    slug: post.s3url
  }));
}

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { DataStore } = withSSRContext();
  const post = await DataStore.query(PostModel, (c: any) => c.s3url.eq(params.slug));

  if (!post || !post[0]?.title) {
    return null;
  }

  return {
    title: `PineSearch - ${post[0].title}`,
    description: post[0].summary,
    other: {
      "twitter:card": "summary",
      "twitter:title": `PineSearch - ${post[0].title}`,
      "twitter:description": post[0].summary,
      "twitter:image": "https://www.pinesearch.io/_next/image?url=%2FPinesearchLogo.png&w=256&q=75",
      "og:image": "https://www.pinesearch.io/_next/image?url=%2FPinesearchLogo.png&w=256&q=75",
      "og:type": "website"
    }
  } as Metadata;
}

export const revalidate: number = 30;

export default async function blogPage({ params }: Props) {
  const mdxFile = await Storage.get(`mdx/${params.slug}.md`, { level: "public" });
  const mdxSource = await (await fetch(mdxFile)).text();

  return (
    mdxSource && (
      <div className="py-4">
        <section className="w-[90%] max-w-[806px] mx-auto">
          <ImageClient
            className="w-full object-fills object-center h-[300px] rounded-md"
            width={300}
            height={300}
            imageName={params.slug}
            alt={`ia-image by ${params.slug}`}
          />

          <ButtonsBar slug={params.slug} />

          <GenerateHtmlFromMdx source={mdxSource} />
        </section>
      </div>
    )
  );
}
