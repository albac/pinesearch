"use client";

import { Storage } from "aws-amplify";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoaderSpinner } from "./LoaderSpinner";

interface Props {
  className: string;
  height: number;
  width: number;
  alt: string;
  imageName: string;
}

export const ImageClient = ({ alt, className, width, height, imageName, ...others }: Props) => {
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(true);

  const getImage = async () => {
    try {
      const imageSrc = await Storage.get(`${imageName}.webp`, { level: "public" });
      setSrc(imageSrc);
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <>
      {loading ? (
        <LoaderSpinner width={width} height={height} />
      ) : (
        <Image src={src} className={className} width={width} height={height} alt={alt} />
      )}
    </>
  );
};
