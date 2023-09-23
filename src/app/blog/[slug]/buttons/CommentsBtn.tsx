import { CommentIcon } from "../../../../../public/icons/CommentIcon";

export const CommentsBtn = () => {
  return (
    <button className="flex text-fig-gray bg-fig-grey-mint p-[10px] rounded-md mt-6 gap-1 hover:scale-110">
      <CommentIcon /> <span className="font-medium">Comments</span>
    </button>
  );
};
