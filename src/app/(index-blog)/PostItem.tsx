"use client";

import { formateDate, uniqueArray } from "@/helpers";
import Link from "next/link";
import { ImageClient } from "@/components/ImageClient";
import { DataStore } from "aws-amplify";
import { PostLikes } from "@/models";
import { useEffect, useState } from "react";
import { HeartLikedIcon } from "../../../public/icons/HeartLikedIcon";

interface Props {
  title: string;
  summary: string;
  createdAt: string;
  s3url: string;
}
export default function PostItem({ title, summary, createdAt, s3url }: Props) {
  const [totalLikes, setTotalLikes] = useState<number>(0);

  const getLikes = async () => {
    const postLikes = (
      await DataStore.query(PostLikes, (postLikes: any) => postLikes.s3url.eq(s3url))
    )[0];

    if (!postLikes) return;

    setTotalLikes(uniqueArray(postLikes.users_likes).length);
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <Link className="block" href={`/blog/${s3url}`}>
      <div className="hover:shadow-md hover:cursor-pointer relative flex">
        <article className="lg:flex items-center gap-5  p-4 transition-colors">
          <ImageClient
            className="rounded-lg w-[180px] h-[180px] block"
            imageName={s3url}
            width={180}
            height={180}
            alt={`image-created-by-${s3url}`}
          />
          <div className="mt-3 lg:mt-0">
            <p className="text-base text-gray-400 font-poping">
              {" "}
              {formateDate(new Date(createdAt))}
            </p>
            <h2 className="font-semibold text-[22px] font-poping leading-tight">{title}</h2>
            <p className="mt-2 font-pt_serif">{summary}</p>
          </div>
        </article>
        <div className="text-center absolute right-[10px]">
          <p className="rounded-full bg-fig-grey-mint text-fig-gray px-[10px] py-[5px] font-poping flex items-center gap-2">
            <HeartLikedIcon mainFill="#5a5858" borderFill="#302c2c" /> <span> {totalLikes}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
