import Image from "next/image";
import PostResult from "./PostResult";
import React, { useEffect } from "react";

interface ISearchResultProps {
  queries: Array<string>;
  resultString: string | null;
  resultArray: Array<{ source: string; text: string; title: string }> | null;
}

export default function SearchResult({ queries, resultString, resultArray }: ISearchResultProps) {
  return (
    <>
      <div className="flex flex-col w-5/6 justify-center pt-5 sm:p-8 mt-2 border-b border-slate-100">
        <div className="sm:flex w-full items-center">
          <div className="w-10 h-10 rounded-full border border-fig-gray flex justify-center items-center">
            <Image src="/icons/user.svg" alt="user" width="20" height="20" />
          </div>
          <p className="sm:ml-4 mt-2 sm:mt-0 w-5/6 text-left">{queries[queries.length - 1]}</p>
        </div>
        <div className="sm:flex w-full mt-8 mb-5">
          <Image src="/icons/AI.svg" alt="user" width="40" height="40" className="h-10" />
          {resultString && <p className="sm:ml-4 mt-2 sm:mt-0 w-full text-left">{resultString}</p>}
        </div>
      </div>
      <div className="w-5/6 sm:px-8 flex items-start my-4">
        <h3 className="font-semibold uppercase text-xs text-fig-gray">
          Your Question is Answered In These Posts
        </h3>
      </div>
      {/* dummy post results for now */}
      {resultArray &&
        resultArray.map((item, index) => (
          <PostResult key={index} source={item.source} text={item.text} title={item.title} />
        ))}
    </>
  );
}
