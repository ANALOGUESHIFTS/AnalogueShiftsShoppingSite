import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    img: "src/assets/images/blog-1.jpg.webp",
    title: "The Personality Trait That Makes People Happier",
    category: "TRAVEL",
    date: "May 19, 2019",
  },
  {
    img: "src/assets/images/blog-2.jpg.webp",
    title: "This was one of our first days in Hawaii last week.",
    category: "FASHION",
    date: "May 19, 2019",
  },
  {
    img: "src/assets/images/blog-3.jpg.webp",
    title: "Last week I had my first work trip of the year to Sonoma Valley",
    category: "TRAVEL",
    date: "May 19, 2019",
  },
  {
    img: "src/assets/images/blog-4.jpg.webp",
    title: "Happppppy New Year! I know I am a little late on this post",
    category: "FASHION",
    date: "May 19, 2019",
  },
  {
    img: "src/assets/images/blog-5.jpg.webp",
    title: "Absolue collection. The Lancome team has been one…",
    category: "MODEL",
    date: "May 19, 2019",
  },
  {
    img: "src/assets/images/blog-6.jpg.webp",
    title: "Writing has always been kind of therapeutic for me",
    category: "FASHION",
    date: "May 19, 2019",
  },
];

export default function BlogPage() {
  const [amountToDisplay, setAmountToDisplay] = useState(
    blogs.length <= 6 ? blogs.length : 6
  );
  const [showValue, setShowValue] = useState(amountToDisplay);

  const tags = [
    "Towel",
    "Shoes",
    "Coat",
    "Dresses",
    "Trousers",
    "Men's Hat",
    "Backpack",
  ];

  const loadMore = () => {
    if (showValue < blogs.length && blogs.length <= showValue + 6) {
      setShowValue(blogs.length);
    } else if (showValue < blogs.length && blogs.length > showValue + 6) {
      setShowValue((prev) => prev + 6);
    }
  };

  return (
    <main className="w-full p-28 flex max-[1000px]:px-12 max-[900px]:py-20 max-[800px]:px-5 max-[900px]:flex-col max-[900px]:gap-6">
      <div className="w-[25%] flex flex-col max-[900px]:w-full">
        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">Search</p>
          <div className="w-[90%] max-[900px]:w-full flex h-11">
            <input
              type="search"
              placeholder="Search..."
              className="outline-none border-y-2 border-l-2 border-solid w-[80%] h-full pl-3 text-base text-PrimaryBlack/50 font-semibold"
            />
            <div className="w-[20%] h-full bg-PrimaryBlack flex justify-center items-center cursor-pointer">
              <i className="fa-solid fa-magnifying-glass text-white"></i>
            </div>
          </div>
        </div>
        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">
            Categories
          </p>
          <Link to="" className="text-base text-PrimaryBlack/80 pb-2">
            Fashion
          </Link>
          <Link to="" className="text-base text-PrimaryBlack/80 pb-2">
            Travel
          </Link>
          <Link to="" className="text-base text-PrimaryBlack/80 pb-2">
            Picnic
          </Link>
          <Link to="" className="text-base text-PrimaryBlack/80">
            Model
          </Link>
        </div>

        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">
            Recent Post
          </p>
          <div className="w-[90%] max-[900px]:w-full flex flex-col gap-4">
            {blogs.slice(0, 4).map((data) => {
              return (
                <Link key={data.title} to="" className="w-full flex gap-4 h-20">
                  <div
                    style={{ backgroundImage: `url(${data.img})` }}
                    className="h-full w-[30%] bg-center bg-cover"
                  ></div>
                  <div className="h-full flex flex-col justify-between w-[70%]">
                    <p className="text-PrimaryBlack text-[15px] font-bold tracking-wide">
                      {data.title.length <= 40
                        ? data.title
                        : data.title.slice(0, 40).concat("...")}
                    </p>
                    <div className="w-full flex gap-1">
                      <p className="text-PrimaryOrange text-[13px] font-bold">
                        {data.category}
                      </p>
                      <p className="text-[13px] text-PrimaryBlack/50">
                        - {data.date}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">
            Product Tags
          </p>
          <div className="w-full flex gap-3 items-center flex-wrap">
            {tags.map((tag) => {
              return (
                <Link
                  to=""
                  key={tag}
                  className="w-auto px-5 h-9 border cursor-pointer flex justify-center items-center"
                >
                  <p className="text-base text-PrimaryBlack/70 font-semibold">
                    {tag}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[75%] max-[900px]:w-full">
        <div className="w-full flex flex-wrap gap-x-[4%] gap-y-4">
          {blogs.slice(0, showValue).map((data) => {
            return (
              <div
                className="w-[48%] flex flex-col max-[900px]:w-full"
                key={data.img}
              >
                <div
                  style={{ backgroundImage: `url(${data.img})` }}
                  className=" w-full h-72 bg-cover bg-no-repeat overflow-hidden relative"
                ></div>
                <Link
                  to=""
                  className="w-full pt-6 flex flex-col items-center gap-2"
                >
                  <p className="text-2xl text-PrimaryBlack/90 font-bold pb-1">
                    {data.title}
                  </p>
                  <div className="w-full flex gap-1">
                    <p className="text-PrimaryOrange text-base font-bold">
                      {data.category}
                    </p>
                    <p className="text-base text-PrimaryBlack/50">
                      - {data.date}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-center pt-5">
          <button
            disabled={showValue === blogs.length}
            style={{ opacity: `${showValue === blogs.length ? 0.5 : 1}` }}
            onClick={loadMore}
            className="font-bold text-PrimaryBlack text-base pb-1 border-b-2 border-solid border-PrimaryOrange"
          >
            Load More
          </button>
        </div>
      </div>
    </main>
  );
}
