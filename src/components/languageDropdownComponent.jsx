import { useEffect, useState } from "react";

export default function LanguageDropdownComponent({ clicked }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => setOpacity(1), []);

  return (
    <div
      style={{
        opacity: opacity,
      }}
      className="absolute w-full duration-700 left-0 top-10 bg-white border px-2.5 py-1 max-[900px]:w-[150px] max-[900px]:left-[calc(100%-150px)]"
    >
      <div
        onClick={() => clicked("English")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src="/images/usa-flag.webp" alt="" />
        <p className="text-PrimaryBlack text-sm">English</p>
      </div>
      <div
        onClick={() => clicked("German")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src="/images/germany-flag.webp" alt="" />
        <p className="text-PrimaryBlack text-sm">German</p>
      </div>
    </div>
  );
}
