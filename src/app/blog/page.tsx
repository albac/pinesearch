import { SortDirection, withSSRContext } from "aws-amplify";
import PostItem from "./PostItem";
import { Post } from "@/models";

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
    <main className="max-w-[1100px] w-[90%] mx-auto sm:flex py-10">
      <form className="sm:w-4/12 sm:pr-10 border-b sm:border-b-0 pb-5 sm:pb-0">
        <p className="uppercase font-semibold text-gray-500 text-xs">Filters</p>
        <label className="mt-5 block font-semibold">
          Publised
          <select className="block font-normal bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:shadow-sm w-full max-w-[300px] mt-2">
            <option value="30">Last 30 days</option>
          </select>
        </label>
        <h2 className="uppercase mt-10 font-semibold text-gray-500 text-xs">Related Topics</h2>
        <div className="mt-8 flex flex-wrap gap-4">
          {TAGS.map((tag) => (
            <button key={tag} className="rounded-full bg-gray-100 px-3 py-2 text-sm">
              {tag}
            </button>
          ))}
        </div>
      </form>

      <div className="sm:w-8/12 sm:border-l sm:pl-10 pt-10 sm:pt-0 space-y-5">
        {posts.map((post: any) => (
          <PostItem key={post.s3url} post={post} />
        ))}
      </div>
    </main>
  );
}
