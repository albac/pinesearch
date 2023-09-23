"use client";

import { useAuth } from "@/hooks/useAuth";
import { ChatPdfBtn, AudioButton, CommentsBtn, ShareBtn } from "./buttons";

interface Props {
  // children: React.ReactNode;
  voice: string;
}

export const Buttons = ({ voice }: Props) => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <ShareBtn />
          <AudioButton voice={voice} />
          <CommentsBtn />
        </div>
        <ChatPdfBtn />
      </div>
      <hr className="mt-[10px] h-1" />
    </>
  ) : (
    <div></div>
  );
};
