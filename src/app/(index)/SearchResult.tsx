import Image from "next/image";
import PostResult from "./PostResult";

interface ISearchResultProps {
  queries: Array<string>;
  result: string | null;
}

export default function SearchResult({ queries, result }: ISearchResultProps) {
  return (
    <>
      <div className="flex flex-col w-5/6 justify-center p-8 mt-2 border-b border-slate-100">
        <div className="flex w-full items-center">
          <div className="w-10 h-10 rounded-full border border-custom_gray flex justify-center items-center ">
            <Image src="/icons/user.svg" alt="user" width="20" height="20" />
          </div>
          <p className="ml-4 w-5/6 text-left">{queries[queries.length - 1]}</p>
        </div>
        <div className="flex w-full mt-8">
          <Image src="/icons/AI.svg" alt="user" width="40" height="40" className="h-10" />
          <p className="ml-4 w-full text-left">{result}</p>
        </div>
      </div>
      <div className="w-5/6 px-8 flex items-start my-4">
        <h3 className="font-semibold uppercase text-xs text-custom_gray">
          Your Question is Answered In These Posts
        </h3>
      </div>
      {/* dummy post results for now */}
      <PostResult />
      <PostResult />
    </>
  );
}
