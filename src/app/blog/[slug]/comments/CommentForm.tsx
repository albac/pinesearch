import { FormEvent, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SendIcon } from "../../../../../public/icons/SendIcon";

interface Props {
  handleAddComment: (comment: string, author: string) => Promise<void>;
}
export const CommentForm = ({ handleAddComment }: Props) => {
  const { getUser } = useAuth();
  const user = getUser()?.attributes?.email;
  const [commentValue, setCommentValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);

    if (!user) return;
    if (!commentValue.trim()) return;

    handleAddComment(commentValue, user);
    setCommentValue("");
  };

  return (
    <form className="mt-4 flex" onSubmit={handleSubmit}>
      <input
        className="bg-fig-ligth-mint rounded-xl border-2 border-fig-grey-mint p-4 text-base outline-none focus:shadow-md w-full text-gray-700"
        type="text"
        placeholder="Leave a commet"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
      />
      <button className="translate-x-[-45px] hover:scale-125">
        <SendIcon />
      </button>
    </form>
  );
};
