import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

const blogs = [
  {
    id: 1,
    img: "/images/blog-1.jpg.webp",
    title: "Cinnamon In the look by Marie Claire",
    category: "TRAVEL",
    date: "May 19, 2023",
    description:
      "Cinnamon, a trailblazing entrepreneur, has journeyed from Lagos to the global fashion capitals, establishing herself as a beacon of innovation and style. As the founder of Cinnamon19fashion.com and the creative force behind TSC Agency Nigeria, Cinnamon’s multifaceted talent is phenomenal. In this episode of The Look, she takes us on her sustainable styling journey. Her passion for self-expression and style, ignited by her mother’s glamorous fashion choices, gained momentum when she moved to Paris at 16. Yet, Cinnamon’s influence extends beyond her impeccable style. She has a remarkable talent for curating outfits, empowering women, inspiring confidence, and promoting African fashion. Her journey as a fashion curator and entrepreneur began unexpectedly in 2014 with strangers approached her at an NYSC camp to praise her fashion choices.",
  },
  {
    id: 2,
    img: "/images/blog-2.jpg.webp",
    title: "REVOLUTIONISING NIGERIA’S FASHION E-COMMERCE BY THISDAY STYLE",
    category: "FASHION",
    date: "May 19, 2023",
    description:
      "In recent years, Nigeria has witnessed a significant shift in fashion consumer behaviour as more and more Nigerians embrace the idea of making purchases online. Driven by convenience, availability, and a desire for unique fashion pieces, this trend was further accelerated by the COVID-19 pandemic and its accompanying lockdowns and restrictions on movement. Amidst this, a brand that’s slowly gaining traction as a leader in this space is Cinnamon19fashion.com, a virtual concept store that offers new and exciting ways to experience the best Nigerian fashion from the comfort of your home. Founded in 2016, Cinnamon19fashion.com has quickly gained popularity among fashion enthusiasts, providing a curated selection of the best affordable collections from Nigerian designers. The brainchild of Cinnamon, a well-known fashion influencer and brand curator, this online retail platform combines her innate fashion insight with a deep passion for self-expression. Cinnamon, who inherited her impeccable sense of style from her socialite mother, Nkiru Anumudu, has now become a style icon in her own right....",
  },
  {
    id: 3,
    img: "/images/blog-3.jpg.webp",
    title: "Style Star Edit: Zina X Maju",
    category: "TRAVEL",
    date: "May 19, 2019",
    description:
      "Hey Hey! So I hinted about a collaboration a few weeks ago and I am so happy to share with everyone that @ShopMaju has started a Style Star Edit designing clothes inspired by a personality’s style and I’m very honored to be the first #MajuStyleStar As you all know, my style Is filled with lots of bright colors and prints. Every outfit In this edit Is available to shop immediately on www.shopmaju.com I hope you like them as much as I do.",
  },
  {
    id: 4,
    img: "/images/blog-4.jpg.webp",
    title: "The cover August 2022: Cinnamon",
    category: "FASHION",
    date: "August 22, 2022",
    description:
      "We’re stepping into August with the promise of an exciting month filled with fashionable days, perfectly-tailored moments and brightness that can never be dimmed. Speaking of these promises, our coverstar, Cinnamon, is the poster child for fashionable, perfectly-tailored, bright style. In this edition of The Cover, we get into her life as a fashion entrepreneur, the selling point of shopping from African brands and uncover more about her personal style.",
  },
  {
    id: 5,
    img: "/images/blog-5.jpg.webp",
    title: "Quarantine Fashion",
    category: "MODEL",
    date: "May 19, 2020",
    description:
      "Stay home, stay comfy but stay cute. These style stars might have been indoors but they certainly weren’t letting their style slack, from cool sweat pants to comfy T-shirts, gowns and shorts. Here are our some of our favourite quarantine fashion.",
  },
  {
    id: 6,
    img: "/images/blog-6.jpg.webp",
    title: "Closet covet: Kelly Rowland",
    category: "FASHION",
    date: "May 19, 2020",
    description:
      "Kelly is doing an amazing job advocating for the end of systematic racism and black violence and we’re here for it. In addition to her brilliant mind and chart-topping music of course, we also find her fashion style captivating and definitely covet it. Here are some of our top picks from Kelly’s closet.",
  },
];

export default function BlogPage() {
  const { t, i18n } = useTranslation();

  const [amountToDisplay, setAmountToDisplay] = useState(
    blogs.length <= 6 ? blogs.length : 6
  );
  const [showValue, setShowValue] = useState(amountToDisplay);

  const tags = ["Shoes", "Coat", "Dresses", "Trousers", "Men's Hat"];

  const loadMore = () => {
    if (showValue < blogs.length && blogs.length <= showValue + 6) {
      setShowValue(blogs.length);
    } else if (showValue < blogs.length && blogs.length > showValue + 6) {
      setShowValue((prev) => prev + 6);
    }
  };

  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main
      ref={containerRef}
      className="w-full p-28 flex max-[1000px]:px-12 max-[900px]:py-20 max-[800px]:px-5 max-[900px]:flex-col max-[900px]:gap-6"
    >
      <div className="w-[25%] flex flex-col max-[900px]:w-full">
        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">
            {t("Search")}
          </p>
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
            {t("Categories")}
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
            {t("Recent Post")}
          </p>
          <div className="w-[90%] max-[900px]:w-full flex flex-col gap-4">
            {blogs.slice(0, 4).map((data) => {
              return (
                <Link
                  key={data.title}
                  to={`/blog-details/${data.id}`}
                  className="w-full flex gap-4 h-20"
                >
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
            {t("Product Tags")}
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
                  to={`/blog-details/${data.id}`}
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
