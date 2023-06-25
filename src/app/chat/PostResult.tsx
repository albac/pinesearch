// En PostResult.tsx
import Image from "next/image";
import Link from "next/link"; // Importa el componente Link

interface IPostResultProps {
  source: string;
  text: string;
}

export default function PostResult({ source, text }: IPostResultProps) {
  // Remueve la ruta /tmp/tmpymy2bqal/ del source
  const formattedSource = source.split("/")[3].split(".")[0];

  return (
    <Link
      className="w-5/6 mb-4 px-8 py-2 flex items-center cursor-pointer  hover:shadow-lg"
      href={`/blog/${formattedSource}`}
    >
      <div className="h-24 w-24 relative">
        <Image src="/dummy-post.png" fill={true} alt="post" />
      </div>

      <div className="flex flex-col h-full ml-8 w-3/4">
        <h1 className="font-bold text-left">{formattedSource}</h1>
        <p className="text-left text-sm text-ellipsis">{text}</p>
      </div>
    </Link>
  );
}
