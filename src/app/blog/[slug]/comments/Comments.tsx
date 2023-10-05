"use client";

import { useEffect, useState } from "react";
import { Comment, PostComments } from "@/models";
import { DataStore } from "aws-amplify";
import { ChatItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";

interface Props {
  slug: string;
}

export const Comments = ({ slug }: Props) => {
  const [totalComments, setTotalComments] = useState<Comment[]>([]);
  const [showTotalComments, setShowTotalComments] = useState(false);

  const getComment = async () => {
    const postComments: PostComments = (
      await DataStore.query(PostComments, (postComments: any) => postComments.s3url.eq(slug))
    )[0];

    // if there are no comments is created --> test
    if (!postComments?.id) {
      await DataStore.save(
        new PostComments({
          s3url: slug,
          users_comments: []
        })
      );
      return;
    }

    setTotalComments(postComments.users_comments);
  };

  const updateRestComments = (postComent: PostComments): Comment[] => {
    if (postComent.users_comments.length >= 10) return postComent.users_comments.slice(0, 9);

    return postComent.users_comments;
  };

  const handleAddComment = async (comment: string, author: string) => {
    const gptResponse = "Hi I'm Pinebot, glad you liked the post, thanks for reading us"; //await getGtp();

    const currentComment = (
      await DataStore.query(PostComments, (postLikes: any) => postLikes.s3url.eq(slug))
    )[0]!;

    const updatedPost = await DataStore.save(
      PostComments.copyOf(currentComment, (updated) => {
        updated.users_comments = [
          {
            author: author,
            comment: comment,
            gpt_response: gptResponse
          },
          ...updateRestComments(updated)
        ];
      })
    );
    setTotalComments(updatedPost.users_comments);
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div className="mt-2 pb-10" id="comments">
      <h3 className="text-[27px] lg:text-3xl font-bold">Comments</h3>

      <CommentForm handleAddComment={handleAddComment} />
      {showTotalComments &&
        totalComments.map((data, i) => <ChatItem key={data.author + i} {...data} />)}

      {!showTotalComments &&
        totalComments.slice(0, 1).map((data, i) => <ChatItem key={data.author + i} {...data} />)}

      <div className="flex justify-center items-center">
        <button
          className=" font-bold text-lg underline text-fig-teal mt-10 cursor-pointer"
          onClick={() => setShowTotalComments((prev) => !prev)}
        >
          {showTotalComments ? "Hide last 10 comments." : "Show the last 10 comments."}
        </button>
      </div>
    </div>
  );
};
