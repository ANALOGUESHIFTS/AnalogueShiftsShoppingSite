"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SplideSlide, Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function HomeSectionTwo({ products }) {
  const pathname = usePathname();
  const [perView, setPerView] = useState(3);
  const t = useTranslations("Index");
  const collections = [
    {
      title: t("Men's"),
      image: "/images/banner-1.jpg",
    },
    {
      title: t("Women's"),
      image: "/images/banner-2.jpg",
    },
    {
      title: t("Kid's"),
      image: "/images/banner-3.jpg",
    },
  ];

  const handleResize = () => {
    if (window.innerWidth <= 500) {
      setPerView(1);
    } else if (
      (window.innerWidth < 1250 && window.innerWidth > 900) ||
      (window.innerWidth > 500 && window.innerWidth < 700)
    ) {
      setPerView(2);
    } else {
      setPerView(3);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <p className="text-white font-extrabold text-[50px]">
            {t("Women's")}
          </p>
          <Link
            href={pathname.slice(0, 3).concat("/shop")}
            className="text-white pb-1.5 text-lg font-semibold border-b-2 border-white border-solid"
          >
            {t("Discover More")}
          </Link>
        </div>
        <div className="w-[71%] h-full flex flex-col justify-center max-[900px]:w-full max-[900px]:py-3">
          <div className="w-full h-full relative flex justify-center">
            <div className="w-full pt-8">
              <Splide
                aria-label="Product Images"
                className="w-full"
                options={{
                  perPage: perView,
                  gap: "20px",
                }}
              >
                {products.length > 0 &&
                  products.map((data) => {
                    return (
                      <SplideSlide key={data.id}>
                        <Link
                          href={pathname.slice(0, 3).concat(`/shop/${data.id}`)}
                          className="w-[235px] flex flex-col max-[500px]:w-full"
                        >
                          <div
                            style={{
                              backgroundImage: `url(${data.productPictures[0]})`,
                            }}
                            className="productImageBox bg-center w-full h-80 bg-cover bg-no-repeat overflow-hidden relative"
                          >
                            <button className="favouriteButton border-none duration-300 -translate-y-14 absolute top-5 right-5 bg-transparent text-PrimaryBlack">
                              <i className="fa-regular fa-heart text-lg"></i>
                            </button>
                            <div className="flex w-[80%] absolute bottom-0 left-[10%] gap-[2%] duration-300 translate-y-20 h-12 menu-row">
                              <button className="h-full w-[20%] bg-PrimaryOrange flex justify-center items-center text-white">
                                <i className="fa-solid fa-bag-shopping"></i>
                              </button>

                              <button className="h-full w-[56%] bg-white flex justify-center items-center text-PrimaryBlack">
                                <i className="fa-solid fa-plus text-xs"></i>
                                &nbsp;
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
                      </SplideSlide>
                    );
                  })}
              </Splide>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
