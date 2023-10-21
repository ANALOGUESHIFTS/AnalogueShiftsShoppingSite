import { useEffect, useState } from "react";

export default function LanguageDropdownComponent({ clicked }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => setOpacity(1), []);

  return (
    <div
      style={{
        opacity: opacity,
      }}
      className="absolute w-full duration-700 left-0 top-10 bg-white border flex flex-col gap-2 px-2.5 py-1 max-[900px]:w-[150px] max-[900px]:left-[calc(100%-150px)]"
    >
      <div
        onClick={() => clicked("en")}
        className="flex items-center gap-2 cursor-pointer px-1"
      >
        <img src="/images/usa-flag.webp" className="w-8 h-5" alt="" />
        <p className="text-PrimaryBlack text-sm">English</p>
      </div>
      <div
        onClick={() => clicked("german")}
        className="flex items-center gap-2 cursor-pointer px-1"
      >
        <img src="/images/germany-flag.webp" className="w-8 h-5" alt="" />
        <p className="text-PrimaryBlack text-sm">German</p>
      </div>
      <div
        onClick={() => clicked("french")}
        className="flex items-center gap-2 cursor-pointer px-1"
      >
        <img src="/images/french-flag.png" className="w-8 h-5" alt="" />
        <p className="text-PrimaryBlack text-sm">French</p>
      </div>
      <div
        onClick={() => clicked("spanish")}
        className="flex items-center gap-2 cursor-pointer px-1"
      >
        <img src="/images/spanish-flag.png" className="w-8 h-5" alt="" />
        <p className="text-PrimaryBlack text-sm">Spanish</p>
      </div>
    </div>
  );
}
