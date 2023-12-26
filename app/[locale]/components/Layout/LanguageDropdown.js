"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import UsaFlag from "@/public/images/usa-flag.webp";
import GermanFlag from "@/public/images/germany-flag.webp";
import FrenchFlag from "@/public/images/french-flag.png";
import SpanishFlag from "@/public/images/spanish-flag.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageDropdownComponent() {
  const [opacity, setOpacity] = useState(0);
  const pathname = usePathname();

  useEffect(() => setOpacity(1), []);
  return (
    <div
      style={{
        opacity: opacity,
      }}
      className="absolute w-full duration-700 left-0 top-10 bg-white border flex flex-col gap-2 px-2.5 py-1 max-[900px]:w-[150px] max-[900px]:left-[calc(100%-150px)]"
    >
      <Link
        href={'/en'.concat(pathname.slice(3, pathname.length))}
        className="flex items-center gap-2 cursor-pointer px-1"
      >
        <Image src={UsaFlag} className="w-8 h-5" alt="USA Flag" />
        <p className="text-PrimaryBlack text-sm">English</p>
      </Link>
      <Link
        href={"/de".concat(
         pathname.slice(3, pathname.length)
        )}
        className="flex items-center gap-2 cursor-pointer px-1"
      >
        <Image src={GermanFlag} className="w-8 h-5" alt="German Flag" />
        <p className="text-PrimaryBlack text-sm">German</p>
      </Link>
      <Link
        href={"/fr".concat(
           pathname.slice(3, pathname.length)
        )}
        className="flex items-center gap-2 cursor-pointer px-1"
      >
        <Image src={FrenchFlag} className="w-8 h-5" alt="French Flag" />
        <p className="text-PrimaryBlack text-sm">French</p>
      </Link>
      <Link
        href={"/es".concat(
        pathname.slice(3, pathname.length)
        )}
        className="flex items-center gap-2 cursor-pointer px-1"
      >
        <Image src={SpanishFlag} className="w-8 h-5" alt="Spanish Flag" />
        <p className="text-PrimaryBlack text-sm">Spanish</p>
      </Link>
    </div>
  );
}
