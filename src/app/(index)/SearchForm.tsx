"use client";

import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/blog");
  };
  return (
    <form onSubmit={onSubmitForm}>
      <h1 className="text-5xl font-bold">PineSearch</h1>
      <p className="mt-2 text-2xl">Transforming the internet’s pdfs into beautiful blog posts</p>
      <div className="mx-auto mt-10 flex max-w-[800px] overflow-hidden rounded-full border border-gray-800">
        <input
          className="w-full py-3 sm:py-7 pl-7 outline-none"
          type="text"
          placeholder="Search a topic or ask a question"
        />
        <button className="bg-black text-white px-5">O</button>
      </div>
      <div className="mt-5 flex flex-col items-center justify-center gap-5 sm:flex-row">
        <p>Quick search:</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="rounded-full bg-gray-200 px-2 py-1">Science</button>
          <button className="rounded-full bg-gray-200 px-2 py-1">Law</button>
          <button className="rounded-full bg-gray-200 px-2 py-1">Academics</button>
        </div>
      </div>
    </form>
  );
}
