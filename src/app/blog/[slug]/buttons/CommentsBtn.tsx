import { CommentIcon } from "../../../../../public/icons/CommentIcon";

export const CommentsBtn = () => {
  const scrollToComments = () => {
    const commentsSection = document.getElementById("comments");
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <button
        className="flex text-fig-gray bg-fig-grey-mint p-[10px] rounded-md mt-2 gap-1 hover:scale-110"
        onClick={scrollToComments}
      >
        <CommentIcon /> <span className="font-medium">Comments</span>
      </button>
    </div>
  );
};
