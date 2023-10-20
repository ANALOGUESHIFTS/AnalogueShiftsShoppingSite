import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

export default function NavBarComponent() {
  const { t, i18n } = useTranslation();
  const [navbarHeight, setNavbarHeight] = useState("0px");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Department");
  const [departments, setDepartments] = useState([
    "Men's Clothing",
    "Women's Clothing",
    "Underwear",
    "Kid's Clothing",
    "Brand Fashion",
    "Accessories/Shoes",
    "Luxury Brands",
    "Brand Outdoor Apparel",
  ]);

  const pathname = useLocation().pathname;

  const toggleHeight = () => {
    setNavbarHeight((prev) => (prev === "0px" ? "auto" : "0px"));
  };
  return (
    <div className="w-full h-auto bg-PrimaryBlack duration-500 px-28 flex flex-col max-[1000px]:px-12 max-[900px]:px-4">
      <nav className="h-14 w-full grid grid-cols-8 max-[900px]:hidden">
        <div
          id="departmentsBox"
          className="col-span-2 relative flex justify-between items-center px-4 bg-[#3b3b3b] cursor-pointer"
        >
          <div className="flex items-center gap-5">
            <i class="fa-solid fa-bars text-white"></i>
            <p className="text-white text-sm font-medium">
              {selectedDepartment}
            </p>
          </div>
          <div>
            <i class="fa-solid fa-angle-down text-white"></i>
          </div>
          <ul className="bg-white flex w-full py-4 px-8 shadow-2xl absolute top-14 left-0 flex-col gap-4">
            {departments.map((data) => {
              return (
                <li
                  key={data}
                  className="text-PrimaryBlack hover:text-PrimaryOrange text-[15px] font-semibold"
                >
                  <Link to="/shop">{data}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Link
          to="/"
          data="HOME"
          style={{
            backgroundColor: `${pathname === "/" ? "#e7ab3c" : "transparent"}`,
          }}
          className="navLink relative col-span-1 flex h-14 justify-center items-center border-r border-solid border-[#3b3b3b]"
        >
          <p className="text-white font-semibold text-[15px]">HOME</p>
        </Link>
        <Link
          to="/shop"
          data="SHOP"
          style={{
            backgroundColor: `${
              pathname === "/shop" ? "#e7ab3c" : "transparent"
            }`,
          }}
          className="navLink relative col-span-1 flex h-14 justify-center items-center border-r border-solid border-[#3b3b3b]"
        >
          <p className="text-white font-semibold text-[15px]">SHOP</p>
        </Link>
        <Link
          id="collection"
          to="#"
          data="COLLECTION"
          style={{
            backgroundColor: `${pathname === "#" ? "#e7ab3c" : "transparent"}`,
          }}
          className="navLink relative col-span-1 flex h-14 justify-center items-center border-r border-solid border-[#3b3b3b]"
        >
          <p className="text-white font-semibold text-[15px]">COLLECTION</p>
          <ul className="bg-PrimaryBlack flex w-[115%] py-4 px-8 shadow-2xl absolute top-14 right-0 flex-col gap-4">
            {["Men's", "Women's", "Kid's"].map((data) => {
              return (
                <li
                  key={data}
                  className="text-white font-semibold hover:text-PrimaryOrange text-[15px]"
                >
                  <Link to="/shop">{data}</Link>
                </li>
              );
            })}
          </ul>
        </Link>
        <Link
          to="/blog"
          data="BLOG"
          style={{
            backgroundColor: `${
              pathname === "/blog" ? "#e7ab3c" : "transparent"
            }`,
          }}
          className="navLink relative col-span-1 flex h-14 justify-center items-center border-r border-solid border-[#3b3b3b]"
        >
          <p className="text-white font-semibold text-[15px]">BLOG</p>
        </Link>
        <Link
          to="/contact"
          data="CONTACT"
          style={{
            backgroundColor: `${
              pathname === "/contact" ? "#e7ab3c" : "transparent"
            }`,
          }}
          className="navLink relative col-span-1 flex h-14 justify-center items-center border-r border-solid border-[#3b3b3b]"
        >
          <p className="text-white font-semibold text-[15px]">CONTACT</p>
        </Link>
        <Link
          to="/faq"
          data="FAQ"
          style={{
            backgroundColor: `${
              pathname === "/faq" ? "#e7ab3c" : "transparent"
            }`,
          }}
          className="navLink relative col-span-1 flex h-14 justify-center items-center border-r border-solid border-[#3b3b3b]"
        >
          <p className="text-white font-semibold text-[15px]">FAQ</p>
        </Link>
      </nav>
      <div className="w-full overflow-hidden h-auto min-h-[56px] pb-0 bg-[#4c4c4c]">
        <div className="w-full h-14 flex items-center px-3 justify-end">
          <button
            className="bg-PrimaryBlack border-none rounded px-4 py-2 flex items-center gap-2 text-white font-semibold text-[15px]"
            onClick={toggleHeight}
          >
            MENU <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div style={{ height: navbarHeight }} className="px-[5%] flex flex-col">
          <Link
            to="/"
            className="h-8 flex items-center rounded px-3 text-white text-[15px] hover:bg-white/50 hover:text-PrimaryBlack"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="h-8 flex items-center rounded px-3 text-white text-[15px] hover:bg-white/50 hover:text-PrimaryBlack"
          >
            Shop
          </Link>
          <Link to="#" className="h-auto  flex flex-col">
            <p
              onClick={() => {
                let elem = document.getElementById("mobileCollection");
                let caret = document.getElementById("collectionCaret");
                if (elem.style.height !== "auto") {
                  elem.style.height = "auto";
                  caret.style.transform = "rotate(90deg)";
                } else {
                  elem.style.height = "0px";
                  caret.style.transform = "rotate(0deg)";
                }
              }}
              className="flex h-8 items-center  rounded px-3 text-white text-[15px] hover:bg-white/50 hover:text-PrimaryBlack"
            >
              Collection &nbsp;{" "}
              <i
                id="collectionCaret"
                class="fa-solid fa-caret-right duration-300"
              ></i>
            </p>
            <ul
              id="mobileCollection"
              className="h-0 w-full overflow-hidden pl-5 pt-2 flex flex-col"
            >
              {["Men's", "Women's", "Kid's"].map((data) => {
                return (
                  <li key={data} className="">
                    <Link
                      to=""
                      className="h-8 flex items-center rounded px-3 text-white text-[15px] hover:bg-white/50 hover:text-PrimaryBlack"
                    >
                      {data}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Link>
          <Link
            to="/blog"
            className="h-8 flex items-center rounded px-3 text-white text-[15px] hover:bg-white/50 hover:text-PrimaryBlack"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="h-8 flex items-center rounded px-3 text-white text-[15px] hover:bg-white/50 hover:text-PrimaryBlack"
          >
            Contact
          </Link>
          <Link
            to="/faq"
            className="h-8 flex items-center rounded px-3 text-white text-[15px] hover:bg-white/50 hover:text-PrimaryBlack mb-3"
          >
            Faq
          </Link>
        </div>
      </div>
    </div>
  );
}
