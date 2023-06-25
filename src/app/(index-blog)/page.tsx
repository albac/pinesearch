import { SortDirection, withSSRContext } from "aws-amplify";
import PostItem from "./PostItem";
import { Post } from "@/models";
import SearchForm from "../chat/SearchForm";
import SearchComponent from "./SearchComponent";

const TAGS = ["Biochemistry", "Medicine", "Neuroscience", "Bioinformatics", "Micro Biology"];

const getPosts = async () => {
  const { DataStore } = withSSRContext();
  const posts = await DataStore.query(Post, (c: any) => c, {
    sort: (s: any) => s.updatedAt(SortDirection.DESCENDING)
  });

  return posts;
};

export default async function page() {
  const posts = await getPosts();
  return (
    <main className="max-w-[1100px] w-[90%] mx-auto mdplus:flex py-10">
      <div className="mdplus:w-4/12 mdplus:pr-10 border-b mdplus:border-b-0 pb-5 mdplus:pb-0 zz:bg-black">
        <SearchComponent />
      </div>

      <div className="mdplus:w-8/12 mdplus:border-l mdplus:pl-10 pt-10 mdplus:pt-0 space-y-5">
        {posts.map((post: any) => (
          <PostItem key={post.s3url} post={post} />
        ))}
      </div>
    </main>
  );
}
