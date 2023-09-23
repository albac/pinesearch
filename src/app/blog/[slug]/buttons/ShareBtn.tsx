import { ShareIcon } from "../../../../../public/icons/ShareIcon";

export const ShareBtn = () => {
  return (
    <button className="flex text-fig-gray bg-fig-grey-mint p-[10px] rounded-md mt-6 gap-1 hover:scale-110">
      <ShareIcon /> <span className="font-medium">Share</span>
    </button>
  );
};
