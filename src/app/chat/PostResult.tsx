// En PostResult.tsx
"use client";

import { Storage } from "aws-amplify";
import Image from "next/image";
import Link from "next/link"; // Importa el componente Link
import { useEffect, useState } from "react";

interface IPostResultProps {
  source: string;
  text: string;
}

export default function PostResult({ source, text }: IPostResultProps) {
  // Remueve la ruta /tmp/tmpymy2bqal/ del source
  const formattedSource = source.split("/")[3].split(".")[0];

  const [image, setImage] = useState("");

  const getUploadedImage = async () => {
    const file = await Storage.get(formattedSource + ".webp", {
      level: "public"
    });
    setImage(file);
  };

  useEffect(() => {
    getUploadedImage();
  }, []);

  return (
    <Link
      className="w-5/6 mb-4 px-8 py-4 sm:flex items-center cursor-pointer hover:shadow-lg"
      href={`/blog/${formattedSource}`}
    >
      <div className="h-24 w-24 relative">
        {image && <Image src={image} fill={true} alt="post" />}
      </div>

      <div className="flex flex-col h-full sm:ml-8 sm:w-3/4 overflow-hidden">
        <h1 className="font-bold text-left">{formattedSource}</h1>
        <p className="text-start sm:text-left text-sm text-ellipsis">{text}</p>
      </div>
    </Link>
  );
}
