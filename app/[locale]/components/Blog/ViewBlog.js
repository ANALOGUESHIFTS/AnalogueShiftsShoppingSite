"use client";
import { useState } from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { blogs } from "./data";
import { usePathname } from "next/navigation";

export default function ViewBlog({ id }) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const t = useTranslations("Index");
  const data = blogs.filter((blog) => blog.id.toString() === id)[0];
  const index = blogs.indexOf(data) + 1;
  const previousPost = blogs[Math.max(0, index - 2)];
  const nextPost = blogs[Math.min(blogs.length - 1, index)];

  return (
    <main className="px-28 py-20 max-[800px]:p-5 max-[1000px]:px-12">
      <p className="w-full text-center font-bold text-4xl text-PrimaryBlack">
        {data.title}
      </p>
      <div className="w-full flex justify-center gap-8 items-center py-6 max-[800px]:flex-col">
        <div className="border-b w-32"></div>
        <div className=" flex gap-1">
          <p className="text-PrimaryOrange text-base font-bold">
            {data.category}
          </p>
          <p className="text-base text-PrimaryBlack/50">- {data.date}</p>
        </div>
        <div className="border-b w-32"></div>
      </div>
      <p className="w-full py-6 text-PrimaryBlack/70 font-medium text-lg">
        {data.description}
      </p>
      <p className="pb-5 mb-6 pl-4 w-full border-l-4 border-PrimaryOrange border-solid text-PrimaryBlack font-bold text-xl">
        “ Technology is nothing. What's important is that you have a faith in
        people, that they're basically good and smart, and if you give them
        tools, they'll do wonderful things with them.”
        <span className="font-semibold text-lg">- STEVEN JOBS</span>
      </p>
      <div className="mb-6 w-full flex flex-wrap justify-between gap-y-4 ">
        <div
          style={{ backgroundImage: `url(${blogs[0].img})` }}
          className="w-[32%] h-60 bg-cover bg-center max-[800px]:w-full"
        ></div>
        <div
          style={{ backgroundImage: `url(${blogs[1].img})` }}
          className="w-[32%] h-60 bg-cover bg-center max-[800px]:w-full"
        ></div>
        <div
          style={{ backgroundImage: `url(${blogs[2].img})` }}
          className="w-[32%] h-60 bg-cover bg-center max-[800px]:w-full"
        ></div>
      </div>
      <div className="w-full h-44 flex justify-between items-center border-t max-[800px]:flex-col">
        <Link
          href={pathname.slice(0, 3).concat(`/blog/${previousPost.id}`)}
          className="flex w-96 h-24 items-center gap-3 max-[800px]:w-full max-[800px]:justify-between"
        >
          <i class="fa-solid fa-arrow-left text-PrimaryBlack/70 text-xl"></i>
          <div
            style={{ backgroundImage: `url(${previousPost.img})` }}
            className="h-16 w-16 rounded-full bg-cover bg-center"
          ></div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-PrimaryBlack/70 font-semibold">
              Previous Post:
            </p>
            <p className="text-PrimaryBlack font-bold text-base">
              {previousPost.title.length <= 30
                ? previousPost.title
                : previousPost.title.slice(0, 30).concat("...")}
            </p>
          </div>
        </Link>
        <Link
          href={pathname.slice(0, 3).concat(`/blog/${nextPost.id}`)}
          className="flex w-96 h-24 items-center gap-3 max-[800px]:w-full max-[800px]:justify-between"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm text-PrimaryBlack/70 font-semibold">
              Next Post:
            </p>
            <p className="text-PrimaryBlack font-bold text-base">
              {nextPost.title.length <= 30
                ? nextPost.title
                : nextPost.title.slice(0, 30).concat("...")}
            </p>
          </div>
          <div
            style={{ backgroundImage: `url(${nextPost.img})` }}
            className="h-16 w-16 rounded-full bg-cover bg-center"
          ></div>
          <i class="fa-solid fa-arrow-right text-PrimaryBlack/70 text-xl"></i>
        </Link>
      </div>
      <div className="w-full">
        <p className="font-bold text-2xl text-PrimaryBlack pb-5">
          {t("Leave A Comment")}
        </p>

        <div className="w-full flex justify-between pb-5 max-[800px]:gap-5 max-[800px]:flex-col">
          <input
            type="text"
            value={userName}
            placeholder="Your name"
            onChange={(e) => setUserName(e.target.value)}
            className="w-[47%] max-[800px]:w-full py-3 border outline-none rounded pl-4 text-PrimaryBlack/70 text-[15px]"
          />
          <input
            type="email"
            value={userEmail}
            placeholder="Your email"
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-[47%] max-[800px]:w-full py-3 border outline-none pl-4 rounded text-PrimaryBlack/70 text-[15px]"
          />
        </div>
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          name="message"
          className="outline-none border h-40 rounded text-PrimaryBlack/70 text-[15px] px-4 py-3 w-full"
          cols="30"
          rows="10"
        ></textarea>
        <div className="pt-5">
          <button className="bg-PrimaryOrange text-white text-[15px] font-bold border-npne px-6 py-2.5">
            {t("SEND MESSAGE")}
          </button>
        </div>
      </div>
    </main>
  );
}
