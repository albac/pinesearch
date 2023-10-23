"use client";

import { useState } from "react";
import { AudioButton, ShareBtn, LikeBtn } from "./buttons/index";
import { RecurlyCard } from "@/components/RecurlyCard";

interface Props {
  slug: string;
}

export const ButtonsBar = ({ slug }: Props) => {
  const [showRecurlyModal, setShowRecurlyModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <LikeBtn slug={slug} />
          <ShareBtn slug={slug} />
          <AudioButton slug={slug} />
          {/* <CommentsBtn /> */}
        </div>
        {/* <ChatPdfBtn /> */}
        <button onClick={() => setShowRecurlyModal((prev) => !prev)}>Suscription</button>

        {showRecurlyModal && (
          <div className="p-5 shadow-lg bg-white absolute top-[15%] left-[10%]">
            <RecurlyCard />
          </div>
        )}
      </div>
      <hr className="mt-[10px] h-1" />
    </>
  );
};
