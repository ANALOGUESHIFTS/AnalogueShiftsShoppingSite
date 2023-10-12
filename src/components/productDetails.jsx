import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { menProducts, femaleProducts } from "./products";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const products = [...menProducts, ...femaleProducts];
  const item = products.filter((data) => data.id === id);
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main
      ref={containerRef}
      className="p-28 max-[1000px]:px-12 max-[800px]:p-5"
    >
      <div className="w-full flex gap-20 flex-wrap">
        <Splide
          aria-label="Product Images"
          className="w-[250px] max-[500px]:w-[90%]"
        >
          {item[0].productPictures.map((picture) => (
            <SplideSlide key={Math.random() * 200 + Math.random()}>
              <img src={"/" + picture} alt="Image 2" />
            </SplideSlide>
          ))}
        </Splide>
        <div className="w-[400px] flex flex-col max-[500px]:w-[90%]">
          <p className="text-PrimaryBlack text-2xl font-bold">{item[0].name}</p>
          <p className="text-PrimaryBlack/80 font-semibold text-sm pt-3">
            {item[0].description}
          </p>
          <p className="text-xl text-PrimaryOrange font-bold flex items-center pt-3">
            ${item[0].priceAfter}&nbsp;
            {item[0].priceBefore && (
              <p
                className="text-xl text-PrimaryBlack/80 font-normal relative"
                id="priceBefore"
              >
                ${item[0].priceBefore}
              </p>
            )}
          </p>
          <div className="pt-3">
            <p className="text-PrimaryBlack/80 font-semibold text-sm pt-1 pb-3">
              Color: {selectedColor}
            </p>
            <div className="flex w-full flex-wrap gap-1.5">
              {item[0].colors.map((color) => {
                return (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="w-6 h-6 flex justify-center items-center rounded-[50%] hover:border hover:border-solid hover:border-black/70 cursor-pointer"
                  >
                    <div
                      style={{ backgroundColor: `${color}` }}
                      className="w-5 h-5 rounded-[50%]"
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pt-3">
            <p className="text-PrimaryBlack/80 font-semibold text-sm pt-1 pb-3">
              Size: {selectedSize}
            </p>
            <div className="flex w-full flex-wrap gap-1.5">
              {item[0].sizes.map((size) => {
                return (
                  <div
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="w-14 h-9 rounded flex justify-center items-center border border-solid border-black/20 cursor-pointer"
                  >
                    <p className="text-lg font-bold text-PrimaryBlack">
                      {size}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className=" flex flex-col w-auto items-center">
          <p className="pb-3 text-PrimaryBlack text-base font-semibold">
            Quantity
          </p>
          <div className="flex w-auto pb-4">
            <button
              onClick={() => setQuantity((prev) => Math.max((prev -= 1), 0))}
              className="border-none bg-transparent text-PrimaryBlack/40 font-bold text-2xl flex px-5 h-full items-center max-[900px]:text-xl"
            >
              -
            </button>
            <p className="px-5 h-full flex items-center text-PrimaryBlack/70 font-semibold max-[900px]:text-sm r">
              {quantity}
            </p>
            <button
              onClick={() => setQuantity((prev) => (prev += 1))}
              className="border-none bg-transparent text-PrimaryBlack/40 flex font-bold text-2xl px-5 h-full items-center max-[900px]:text-xl"
            >
              +
            </button>
          </div>
          <button className="border-none bg-PrimaryOrange flex items-center justify-center text-base font-bold text-white px-8 py-2 duration-300 hover:bg-PrimaryOrange/80">
            ADD TO CART
          </button>
        </div>
      </div>
    </main>
  );
}
