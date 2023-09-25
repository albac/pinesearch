import { useEffect, useRef, useState } from "react";
import { ShareIcon } from "../../../../../public/icons/ShareIcon";
import { useOpen } from "@/hooks/useOpen";

interface Props {
  slug: string;
}

export const ShareBtn = ({ slug }: Props) => {
  const { isOpen, containerRef, handleClose } = useOpen();

  const blogUrl = `https://pinesearch.io/blog/${slug}`;

  const handleShareFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      blogUrl
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

  const handleShareTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`;
    window.open(twitterShareUrl, "_blank");
  };

  return (
    <div className="relative text-left mt-2" ref={containerRef}>
      <div>
        <button
          onClick={handleClose}
          type="button"
          className="flex gap-1 items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-fig-gray bg-fig-grey-mint hover:scale-110"
        >
          <ShareIcon />
          Share
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={handleShareFacebook}
            >
              Share in Facebook
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={handleShareTwitter}
            >
              Share in Twitter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
