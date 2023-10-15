import { useState } from "react";

import { Link, useParams } from "react-router-dom";

export default function BlogDetailsPage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const { id } = useParams();

  const blogs = [
    {
      id: 1,
      img: "/images/blog-1.jpg.webp",
      title: "The Personality Trait That Makes People Happier",
      category: "TRAVEL",
      date: "May 19, 2019",
    },
    {
      id: 2,
      img: "/images/blog-2.jpg.webp",
      title: "This was one of our first days in Hawaii last week.",
      category: "FASHION",
      date: "May 19, 2019",
    },
    {
      id: 3,
      img: "/images/blog-3.jpg.webp",
      title: "Last week I had my first work trip of the year to Sonoma Valley",
      category: "TRAVEL",
      date: "May 19, 2019",
    },
    {
      id: 4,
      img: "/images/blog-4.jpg.webp",
      title: "Happppppy New Year! I know I am a little late on this post",
      category: "FASHION",
      date: "May 19, 2019",
    },
    {
      id: 5,
      img: "/images/blog-5.jpg.webp",
      title: "Absolue collection. The Lancome team has been one…",
      category: "MODEL",
      date: "May 19, 2019",
    },
    {
      id: 6,
      img: "/images/blog-6.jpg.webp",
      title: "Writing has always been kind of therapeutic for me",
      category: "FASHION",
      date: "May 19, 2019",
    },
  ];

  const previousPost = blogs[Math.max(0, id - 2)];
  const nextPost = blogs[Math.min(blogs.length, id)];

  const data = blogs.filter((blog) => blog.id.toString() === id)[0];

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
      <div
        style={{ backgroundImage: `url(${data.img})` }}
        className="w-full h-[500px] bg-no-repeat bg-cover bg-center"
      ></div>
      <p className="w-full py-6 text-PrimaryBlack/70 font-medium text-lg">
        <span className="text-PrimaryBlack font-bold text-4xl">P</span>sum dolor
        sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure Lorem ipsum dolor sit amet, consectetur adipisicing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate.
      </p>
      <p className="pb-5 mb-6 pl-4 w-full border-l-4 border-PrimaryOrange border-solid text-PrimaryBlack font-bold text-xl">
        “ Technology is nothing. What's important is that you have a faith in
        people, that they're basically good and smart, and if you give them
        tools, they'll do wonderful things with them.”{" "}
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
      <p className="w-full pb-7 text-PrimaryBlack/70 font-medium text-lg">
        sum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate.
      </p>
      <div className="w-full h-44 flex justify-between items-center border-t max-[800px]:flex-col">
        <Link
          to={`/blog-details/${Math.max(1, parseInt(id) - 1)}`}
          className="flex w-96 h-24 items-center gap-3 max-[800px]:w-full max-[800px]:justify-between"
        >
          <i class="fa-solid fa-arrow-left text-PrimaryBlack/70 text-xl"></i>
          <div
            style={{ backgroundImage: `url(${previousPost.img})` }}
            className="h-20 w-20 rounded-full bg-cover bg-center"
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
          to={`/blog-details/${Math.min(parseInt(id) + 1, blogs.length)}`}
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
            className="h-20 w-20 rounded-full bg-cover bg-center"
          ></div>
          <i class="fa-solid fa-arrow-right text-PrimaryBlack/70 text-xl"></i>
        </Link>
      </div>
      <div className="w-full">
        <p className="font-bold text-2xl text-PrimaryBlack pb-5">
          Leave A Comment
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
            SEND MESSAGE
          </button>
        </div>
      </div>
    </main>
  );
}
