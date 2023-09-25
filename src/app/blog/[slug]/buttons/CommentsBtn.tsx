import { useOpen } from "@/hooks/useOpen";
import { CommentIcon } from "../../../../../public/icons/CommentIcon";
import { ChatModal } from "../chatModal/ChatModal";

export const CommentsBtn = () => {
  const { isOpen, containerRef, handleClose } = useOpen();

  return (
    <div>
      <button
        className="flex text-fig-gray bg-fig-grey-mint p-[10px] rounded-md mt-2 gap-1 hover:scale-110"
        onClick={handleClose}
      >
        <CommentIcon /> <span className="font-medium">Comments</span>
      </button>
      {isOpen && <ChatModal containerRef={containerRef} handleClose={handleClose} />}
    </div>
  );
};
