import Tag from "@/components/Tag";
import { formateDate } from "@/helpers";
import { Storage } from "aws-amplify";
import Image from "next/image";
import Link from "next/link";

export default async function PostItem({ post }: { post: any }) {
  const { title, summary, createdAt, s3url } = post;

  const src = await Storage.get(`${s3url}.webp`, {
    level: "public"
  });

  return (
    src && (
      <Link className="block" href={`/blog/${post.s3url}`}>
        <article className="lg:flex items-center gap-5 hover:shadow-md hover:cursor-pointer p-4 transition-colors">
          <Image
            className="rounded-lg w-[180px] h-[180px] block"
            src={src}
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
      </Link>
    )
  );
}
