"use client";

import { useState } from "react";
import SearchForm from "./SearchForm";
import SearchModal from "./SearchModal";

export default function Home() {
  const [showSearchModal, setSearchModal] = useState(false);

  return (
    <main
      style={{
        height: "calc(100vh - 210px)"
      }}
      className="mx-auto w-11/12 text-center py-5 flex justify-center items-center"
    >
      <SearchForm openModal={() => setSearchModal(true)} />
      { showSearchModal && <SearchModal closeModal={() => setSearchModal(false)}  /> }
    </main>
  );
}
