"use client";

import { Storage } from "aws-amplify";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  className: string;
  height: number;
  width: number;
  alt: string;
  imageName: string;
}

export const ImageClient = ({ alt, className, width, height, imageName }: Props) => {
  const [src, setSrc] = useState("");

  const getImage = async () => {
    const imageSrc = await Storage.get(`${imageName}.webp`, { level: "public" });
    setSrc(imageSrc);
  };

  useEffect(() => {
    getImage();
  }, []);

  return src ? (
    <Image src={src} className={className} width={width} height={height} alt={alt} />
  ) : (
    <div className={className}></div>
  );
};
