import { getMdxData, getMdxItems } from "@/helpers";
import { MdxRemoteClient } from "./MdxRemoteClient";
// import { Post } from "@/models";
// import { SortDirection, withSSRContext } from "aws-amplify";

export async function generateStaticParams() {
  // const { DataStore } = withSSRContext();
  // const posts = await DataStore.query(Post, (c: any) => c, {
  //   // sort: (s: any) => s.updatedAt(SortDirection.DESCENDING)
  // });
  const posts = getMdxItems();
  return posts.map((slugPost) => ({
    slug: slugPost
  }));
}

export const revalidate = 600;

export default async function blogPage({ params }: { params: any }) {
  const { mdxSource } = await getMdxData(params.slug);
  return (
    <div>
      <MdxRemoteClient mdxSource={mdxSource} />
    </div>
  );
}
