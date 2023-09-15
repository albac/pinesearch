"use client";

import { useRouter } from "next/navigation";
import MagnifyingGlassIcon from "../../../public/icons/MagnifyingGlassIcon";
import Tag from "./Tag";

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
      <div className="mx-auto mt-[60px] py-[28px] px-7 flex lg:w-[840px] overflow-hidden rounded-full border border-fig-gray bg-fig-ligth-mint">
        <input
          className="w-full outline-none placeholder:text-fig-gray placeholder:font-poping bg-transparent"
          type="text"
          placeholder="Search a topic"
          onFocus={openModal}
        />
        <picture className="bg-fig-teal rounded-full scale-[2.5]">
          <MagnifyingGlassIcon className="fill-white h-[25px] w-[25px] p-2" />
        </picture>
      </div>
      {/* End Input */}
      <div className="mt-[30px] flex flex-col items-center justify-center gap-5 sm:flex-row">
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
