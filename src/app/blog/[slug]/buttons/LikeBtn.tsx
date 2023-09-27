import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { PostLikes } from "@/models";
import { useAuth } from "@/hooks/useAuth";
import { HeartLikedIcon } from "../../../../../public/icons/HeartLikedIcon";
import { HeartNotLikedIcon } from "../../../../../public/icons/HeartNotLikedIcon";

interface Props {
  slug: string;
}

const uniqueArray = (array: any[]) => {
  return Array.from(new Set(array));
};

const arrayContains = (array: any[], value: any) => {
  const unique = new Set(array);
  return unique.has(value);
};

export const LikeBtn = ({ slug }: Props) => {
  const { getUser } = useAuth();

  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [iLikesPost, setILikesPost] = useState(false);
  const user_sub = getUser()?.attributes?.sub;

  const getLikes = async () => {
    const postLikes = (
      await DataStore.query(PostLikes, (postLikes: any) => postLikes.s3url.eq(slug))
    )[0];

    // if there are no likes the counter is created --> test
    if (!postLikes?.id) {
      await DataStore.save(
        new PostLikes({
          s3url: slug,
          users_likes: []
        })
      );
      return;
    }

    if (arrayContains(postLikes.users_likes, user_sub)) setILikesPost(true);

    setTotalLikes(uniqueArray(postLikes.users_likes).length);
  };

  const iLiked = (posts: PostLikes) => {
    if (arrayContains(posts.users_likes, user_sub)) {
      setILikesPost(false);
      return true;
    }

    setILikesPost(true);
    return false;
  };

  const handleLike = async () => {
    const currentPost = (
      await DataStore.query(PostLikes, (postLikes: any) => postLikes.s3url.eq(slug))
    )[0]!;

    const updatedPost = await DataStore.save(
      PostLikes.copyOf(currentPost, (updated) => {
        updated.users_likes = iLiked(updated)
          ? uniqueArray(updated.users_likes.filter((el) => el !== user_sub))
          : uniqueArray([...updated.users_likes, user_sub]);
      })
    );
    setTotalLikes(uniqueArray(updatedPost.users_likes).length);
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="mt-2">
      <button
        className="flex gap-1 items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-fig-gray bg-fig-grey-mint hover:scale-110"
        onClick={handleLike}
      >
        {iLikesPost ? <HeartLikedIcon /> : <HeartNotLikedIcon />}
        <span className="ml-2 font-bold">{totalLikes}</span>
      </button>
    </div>
  );
};
