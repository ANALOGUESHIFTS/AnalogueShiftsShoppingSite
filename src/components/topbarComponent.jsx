import { useState, useEffect } from "react";
import LanguageDropdownComponent from "./languageDropdownComponent";

export default function TopbarComponent() {
  const [languageSelected, setLanguageSelected] = useState("English");
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    setDropdown(false);
  }, [languageSelected]);
  return (
    <div className="px-28 flex w-full items-center border-b">
      <div className="w-11/12 h-14  grid grid-cols-7">
        <div className="col-span-2 border-r h-full flex items-center gap-2.5">
          <i class="fa-solid fa-envelope text-PrimaryBlack "></i>
          <p className="text-PrimaryBlack">hello.colorlib@gmail.com</p>
        </div>
        <div className="col-span-4 border-r flex justify-between w-full items-center px-6">
          <div className="flex gap-2.5 items-center">
            <i class="fa-solid fa-phone text-PrimaryBlack text-xs"></i>
            <p className="text-PrimaryBlack">+65 11.188.888</p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="">
              <i class="fa-brands fa-facebook-f text-PrimaryBlack text-sm"></i>
            </a>
            <a href="">
              <i class="fa-brands fa-twitter text-PrimaryBlack text-sm"></i>
            </a>
            <a href="">
              <i class="fa-brands fa-linkedin-in text-PrimaryBlack text-sm"></i>
            </a>
            <a href="">
              <i class="fa-brands fa-pinterest-p text-PrimaryBlack text-sm"></i>
            </a>
          </div>
        </div>
        <div
          onClick={() => setDropdown((prev) => !prev)}
          className="col-span-1 border-r h-full flex items-center justify-between px-4 cursor-pointer relative"
        >
          <div className="flex items-center gap-2">
            <img
              src={
                languageSelected === "English"
                  ? "/src/assets/images/usa-flag.webp"
                  : "/src/assets/images/germany-flag.webp"
              }
              alt=""
            />
            <p className="text-PrimaryBlack text-sm">
              {languageSelected === "English" ? "English" : "German"}
            </p>
          </div>
          <i class="fa-solid fa-angle-down text-PrimaryBlack text-xs"></i>
          {dropdown && (
            <LanguageDropdownComponent
              clicked={(language) => {
                setLanguageSelected(language);
              }}
            />
          )}
        </div>
      </div>
      <a href="" className="w-1/12 h-14 flex justify-end items-center gap-2">
        <i class="fa-solid fa-user text-PrimaryBlack text-xs"></i>
        <p className="text-PrimaryBlack text-sm">Login</p>
      </a>
    </div>
  );
}
