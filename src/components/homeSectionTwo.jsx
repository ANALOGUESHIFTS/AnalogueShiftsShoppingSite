import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { femaleProducts } from "./products";

export default function HomeSectionTwo() {
  const [selectedCategory, setSelectedCategory] = useState("Clothings");
  const [sliderPosition, setSliderPosition] = useState(0);

  const maximumWidth = 100000000000;

  const collections = [
    {
      title: "Men's",
      image: "/images/banner-1.jpg",
    },
    {
      title: "Women's",
      image: "/images/banner-2.jpg",
    },
    {
      title: "Kid's",
      image: "/images/banner-3.jpg",
    },
  ];

  const products = femaleProducts;
  const categories = ["Clothings", "HandBag", "Shoes", "Accessories"];

  const slideRight = () => {
    const amountToScroll = 255 * (products.length - 1);
    if (sliderPosition < amountToScroll) {
      setSliderPosition((prev) => prev + 255);
    }
  };

  const slideLeft = () => {
    if (sliderPosition > 0) {
      setSliderPosition((prev) => prev - 255);
    }
  };

  return (
    <div className="w-full px-28 py-14 max-[1000px]:px-12 max-[800px]:px-5">
      <div className="w-full flex justify-between pb-14 max-[900px]:flex-col max-[900px]:justify-center max-[900px]:gap-5">
        {collections.map((data) => {
          return (
            <div
              style={{ backgroundImage: `url(${data.image})` }}
              key={data.title}
              className="bg-no-repeat bg-cover max-[900px]:w-full w-[31%] h-52 flex items-center justify-center relative collectionBox"
            >
              <p className="bg-white px-6 py-2.5 font-bold text-xl text-PrimaryBlack">
                {data.title}
              </p>
            </div>
          );
        })}
      </div>
      <div className="h-[620px] flex gap-[3%] max-[900px]:h-auto max-[900px]:flex-col">
        <div
          style={{
            backgroundImage: "url(images/women-large.jpg.webp)",
          }}
          className="h-full w-[26%] max-[900px]:w-full max-[900px]:h-[620px] bg-no-repeat bg-cover flex flex-col justify-center bg-center items-center"
        >
          <p className="text-white font-extrabold text-[50px]">Women's</p>
          <Link
            to=""
            className="text-white pb-1.5 text-lg font-semibold border-b-2 border-white border-solid"
          >
            Discover More
          </Link>
        </div>
        <div className="w-[71%] h-full flex flex-col justify-center max-[900px]:w-full max-[900px]:py-3">
          <div className="flex justify-center gap-5">
            {categories.map((category) => {
              return (
                <p
                  style={{
                    color: `${
                      selectedCategory === category
                        ? "#252525"
                        : "rgba(0,0,0,0.5)"
                    }`,
                    borderBottom: `${
                      selectedCategory === category
                        ? "2px solid #252525"
                        : "none"
                    }`,
                  }}
                  className="text-lg font-semibold pb-1 cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </p>
              );
            })}
          </div>
          <div className="w-full h-full relative flex justify-center">
            <button
              onClick={slideLeft}
              className="border-none bg-transparent absolute top-[calc(50%-30px)] left-0"
            >
              <i className="fa-solid fa-angle-left text-PrimaryBlack/60 text-3xl hover:text-PrimaryOrange"></i>
            </button>
            <button
              onClick={slideRight}
              className="border-none bg-transparent absolute top-[calc(50%-30px)] right-0"
            >
              <i className="fa-solid fa-angle-right text-PrimaryBlack/60 text-3xl hover:text-PrimaryOrange"></i>
            </button>
            <div className="w-[92%] pt-8 overflow-hidden">
              <div
                style={{
                  transform: `translateX(${-sliderPosition}px)`,
                  width: `${maximumWidth}px`,
                }}
                className="min-w-[100%] duration-500 flex gap-5"
              >
                {products.map((data) => {
                  return (
                    <Link
                      to={`/product-details/${data.id}`}
                      className="w-[235px] flex flex-col"
                      key={data.id}
                    >
                      <div
                        style={{ backgroundImage: `url(${data.img})` }}
                        className="productImageBox w-full h-80 bg-cover bg-no-repeat overflow-hidden relative"
                      >
                        <button className="favouriteButton border-none duration-300 -translate-y-14 absolute top-5 right-5 bg-transparent text-PrimaryBlack">
                          <i className="fa-regular fa-heart text-lg"></i>
                        </button>
                        <div className="flex w-[80%] absolute bottom-0 left-[10%] gap-[2%] duration-300 translate-y-20 h-12 menu-row">
                          <button className="h-full w-[20%] bg-PrimaryOrange flex justify-center items-center text-white">
                            <i className="fa-solid fa-bag-shopping"></i>
                          </button>

                          <button className="h-full w-[56%] bg-white flex justify-center items-center text-PrimaryBlack">
                            <i className="fa-solid fa-plus text-xs"></i>&nbsp;
                            <p className="font-bold text-PrimaryBlack text-sm">
                              Quick View
                            </p>
                          </button>

                          <button className="h-full w-[20%] bg-white flex justify-center items-center text-PrimaryBlack">
                            <i className="fa-solid fa-shuffle"></i>
                          </button>
                        </div>
                      </div>
                      <div className="w-full py-6 flex flex-col items-center gap-2">
                        <p className="text-xs text-PrimaryBlack/50 font-bold">
                          {data.category}
                        </p>
                        <p className="text-lg text-PrimaryBlack/90 font-bold">
                          {data.name}
                        </p>
                        <p className="text-xl text-PrimaryOrange font-bold flex items-center">
                          ${data.priceAfter}&nbsp;
                          {data.priceBefore && (
                            <p
                              className="text-base text-PrimaryBlack/50 font-normal relative"
                              id="priceBefore"
                            >
                              ${data.priceBefore}
                            </p>
                          )}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
