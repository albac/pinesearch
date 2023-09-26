"use client";

import { useAuth } from "@/hooks/useAuth";
import { ChatPdfBtn, AudioButton, CommentsBtn, ShareBtn } from "./buttons";

interface Props {
  slug: string;
}

export const Buttons = ({ slug }: Props) => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <>
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <ShareBtn slug={slug} />
          <AudioButton slug={slug} />
          {/* <CommentsBtn /> */}
        </div>
        {/* <ChatPdfBtn /> */}
      </div>
      <hr className="mt-[10px] h-1" />
    </>
  ) : (
    <div></div>
  );
};
