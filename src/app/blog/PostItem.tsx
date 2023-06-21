import { formateDate } from "@/helpers";
import Image from "next/image";
import Link from "next/link";

export default function PostItem({ post }: { post: any }) {
  const { title, summary, createdAt } = post;
  return (
    <article className="lg:flex items-center gap-5 hover:bg-gray-50 hover:shadow-md hover:cursor-pointer p-4 transition-colors">
      <Link href={`/blog/${post.s3url}`}>
        <Image src="/image.png" width={150} height={200} alt="image-not-found" />
        <div>
          <p className="text-base text-gray-400"> {formateDate(new Date(createdAt))}</p>
          <h2 className="font-semibold text-[22px]">{title}</h2>
          <p className="mt-2">{summary}</p>
          <div className="mt-2 rounded-full bg-gray-200 px-2.5 py-1 inline-block">Biology</div>
        </div>
      </Link>
    </article>
  );
}
