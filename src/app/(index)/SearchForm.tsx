"use client";

import Tag from "@/components/Tag";
import { useRouter } from "next/navigation";

interface IProps {
  openModal: () => void;
}

const TAGS = ["Science", "Law", "Education"];

export default function SearchForm({ openModal }: IProps) {
  const router = useRouter();

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // openModal();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <h1 className="text-5xl font-bold text-fig-primary">PineSearch</h1>
      <p className="mt-2 text-2xl font-poping">
        Transforming the internet’s pdfs into beautiful blog posts
      </p>
      {/* Input */}
      <div className="mx-auto mt-10 flex lg:w-[840px] overflow-hidden rounded-full border border-gray-800">
        <input
          className="w-full py-[28px] pl-7 outline-none bg-fig-ligth-mint placeholder:text-fig-gray placeholder:font-poping"
          type="text"
          placeholder="Search a topic or ask a question"
          onFocus={openModal}
        />
        <button className="bg-fig-teal text-white px-5">O</button>
      </div>
      {/* End Input */}
      <div className="mt-5 flex flex-col items-center justify-center gap-5 sm:flex-row">
        <p>Quick search:</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          {TAGS.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </form>
  );
}
