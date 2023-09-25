import { useEffect, useRef, useState } from "react";
import { ShareIcon } from "../../../../../public/icons/ShareIcon";

interface Props {
  slug: string;
}

export const ShareBtn = ({ slug }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const blogUrl = `https://pinesearch.io/blog/${slug}`;


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAutoCloseMenu = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

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

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleAutoCloseMenu);
    } else {
      document.removeEventListener("click", handleAutoCloseMenu);
    }

    return () => {
      document.removeEventListener("click", handleAutoCloseMenu);
    };
  }, [isOpen]);

  return (
    <div className="relative text-left mt-6" ref={menuRef}>
      <div>
        <button
          onClick={toggleMenu}
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
