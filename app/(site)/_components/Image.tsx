"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  imgUrl: string;
  alt: string;
  fill?: boolean;
  className?: string;
}

const CustomImage: FC<Props> = ({ imgUrl, alt, fill, className }) => {
  const [isLaoding, setIsLaoding] = useState<boolean>(true);

  return (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        fill={fill}
        className={twMerge(
          `duration-700 ease-in-out ${
            isLaoding
              ? "scale-100 blur-[10px] grayscale"
              : "scale-100 blur-0 grayscale-0"
          }`,
          className
        )}
        loading="lazy"
        onLoadingComplete={() => setIsLaoding(false)}
      />
    </>
  );
};

export default CustomImage;
