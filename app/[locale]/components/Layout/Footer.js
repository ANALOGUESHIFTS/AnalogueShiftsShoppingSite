"use client";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Logo1 from "@/public/images/logo-1.png";
import Logo2 from "@/public/images/logo-2.png";
import Logo3 from "@/public/images/logo-3.png";
import Logo4 from "@/public/images/logo-4.png";
import Logo5 from "@/public/images/logo-5.png";
import CinnamonLogo from "@/public/images/cinnamon-logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [emailValue, setEmailValue] = useState("");
  const pathname = usePathname();

  //Logos
  const logos = [Logo1, Logo2, Logo3, Logo4, Logo5];

  //Social Icons
  const socialIcons = [
    {
      icon: "fa-brands fa-facebook-f text-white",
      path: "https://www.facebook.com/cinnamon19",
    },
    {
      icon: "fa-brands fa-instagram text-white",
      path: "https://instagram.com/thecinnamon19",
    },
  ];

  const t = useTranslations("Index");

  return (
    <footer className="w-full">
      <div
        id="hideScrollBar"
        className="h-28 px-28 bg-[#303030] grid grid-cols-5 items-center max-[800px]:px-5 max-[1000px]:px-12 max-[900px]:flex max-[900px]:w-full max-[900px]:gap-4 max-[900px]:overflow-x-scroll"
      >
        {logos.map((logo) => {
          return (
            <Image
              key={crypto.randomUUID()}
              className="col-span-1 bg-cover bg-center"
              src={logo}
              alt="Logo"
            />
          );
        })}
      </div>
      <div className="bg-PrimaryBlack border-b border-solid border-white/50 p-28 w-full grid grid-cols-10 max-[1000px]:px-12 max-[800px]:px-5 max-[800px]:py-20 max-[900px]:flex max-[900px]:flex-col max-[900px]:gap-5">
        <div className="col-span-3 flex flex-col -translate-y-10">
          <Link href={pathname.slice(0, 3).concat("/")}>
            <Image
              src={CinnamonLogo}
              className="h-20 w-max scale-150"
              alt="Cinnamon Logo"
            />
          </Link>
          <div className="flex flex-col w-full pt-7 gap-3">
            <p className="text-white/70 text-base pr-2 ">
              {t("Address")}: SF1 kaduna city plaza, before kastina round about,
              opposite studio 24, kadunaa Nigeria
            </p>
            <p className="text-white/70 text-base ">
              {t("Phone")}: +2348031376569
            </p>
            <p className="text-white/70 text-base ">
              {t("Email")}: cinnamon19fashion@gmail.com
            </p>
          </div>
          <div className="pt-6 flex gap-2">
            {socialIcons.map((icon) => {
              return (
                <Link key={icon.icon} href={icon.path}>
                  <div className="w-11 h-11 bg-[#303030] rounded-[50%] duration-300 hover:bg-PrimaryOrange flex justify-center items-center">
                    <i className={icon.icon}></i>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="col-span-2 flex flex-col">
          <p className="text-white font-bold text-base">{t("Information")}</p>
          <div className="flex flex-col w-full pt-7 gap-3">
            <Link
              href={pathname.slice(0, 3).concat("/about")}
              className="text-white/70 text-base "
            >
              {t("About Us")}
            </Link>
            <Link
              href={pathname.slice(0, 3).concat("/shopping-cart")}
              className="text-white/70 text-base "
            >
              {t("Checkout")}
            </Link>
            <Link
              href={pathname.slice(0, 3).concat("/contact")}
              className="text-white/70 text-base "
            >
              {t("Contact")}
            </Link>
            <Link
              href={pathname.slice(0, 3).concat("/")}
              className="text-white/70 text-base "
            >
              {t("Services")}
            </Link>
          </div>
        </div>
        <div className="col-span-2 flex flex-col">
          <p className="text-white font-bold text-base">{t("My Account")}</p>
          <div className="flex flex-col w-full pt-7 gap-3">
            <Link
              href={pathname.slice(0, 3).concat("/profile")}
              className="text-white/70 text-base "
            >
              {t("My Account")}
            </Link>
            <Link
              href={pathname.slice(0, 3).concat("/contact")}
              className="text-white/70 text-base "
            >
              {t("Contact")}
            </Link>
            <Link
              href={pathname.slice(0, 3).concat("/shopping-cart")}
              className="text-white/70 text-base "
            >
              {t("Shopping Cart")}
            </Link>
            <Link
              href={pathname.slice(0, 3).concat("/shop")}
              className="text-white/70 text-base "
            >
              {t("Shop")}
            </Link>
          </div>
        </div>
        <div className="col-span-3 flex flex-col">
          <p className="text-white font-bold text-base">
            {t("Join Our Newsletter Now")}
          </p>
          <div className="flex flex-col w-full pt-7 gap-2">
            <p className="text-white/70 text-base ">
              {t("Get E-mail updates about our latest shop and special offers")}
            </p>
            <div className="flex h-11 w-full">
              <input
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                type="text"
                className="w-[70%] h-full border-none outline-none text-white/80 text-base font-medium pl-3.5 bg-[#303030]"
                placeholder="Enter Your Email"
              />
              <button className="w-[30%] h-full border-none bg-PrimaryOrange text-white text-[13px] font-bold">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-PrimaryBlack w-full py-5 flex items-center justify-between">
        <p className="text-white/70 text-base  px-28">
          Copyright ©2023 All rights reserved
        </p>
      </div>
    </footer>
  );
}
