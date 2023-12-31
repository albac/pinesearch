"use client";

import { AudioButton, ShareBtn, LikeBtn } from "./buttons/index";

interface Props {
  slug: string;
}

export const ButtonsBar = ({ slug }: Props) => {
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
      </div>
      <hr className="mt-[10px] h-1" />
    </>
  );
};
