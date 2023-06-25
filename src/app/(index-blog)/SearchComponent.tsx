"use client";

import { useState } from "react";
import SearchModal from "../chat/SearchModal";
import MagnifyingGlassIcon from "../../../public/icons/MagnifyingGlassIcon";

export default function SearchComponent() {
  const [showSearchModal, setSearchModal] = useState(false);

  return (
    <div>
      <div
        className="mx-auto mt-[60px] py-[15px] pl-5 pr-4 flex overflow-hidden rounded-full border border-fig-gray bg-fig-ligth-mint"
        onClick={() => setSearchModal(true)}
      >
        <input
          className="w-full outline-none placeholder:text-fig-gray placeholder:font-poping bg-transparent"
          type="text"
          placeholder="Search a topic"
        />
        <picture className="bg-fig-teal rounded-full scale-[1.8]">
          <MagnifyingGlassIcon className="fill-white h-[25px] w-[25px] p-2" />
        </picture>
      </div>

      {showSearchModal && <SearchModal closeModal={() => setSearchModal(false)} />}
    </div>
  );
}
