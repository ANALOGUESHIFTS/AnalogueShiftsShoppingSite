import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SplideSlide, Splide } from "@splidejs/react-splide";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";

export default function MensCollection({ products }) {
  const [selectedCategory, setSelectedCategory] = useState("Clothings");
  const { t, i18n } = useTranslation();
  const [perView, setPerView] = useState(3);

  const categories = ["Clothings", "HandBag", "Shoes"];

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
      <div className="h-[620px] flex gap-[3%] max-[900px]:h-auto max-[900px]:flex-col">
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
            <div className="w-full pt-8 overflow-hidden">
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
                      <SplideSlide>
                        <Link
                          to={`/product-details/${data.id}`}
                          className="w-[235px] flex flex-col max-[500px]:w-full"
                          key={v4()}
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

        <div
          style={{
            backgroundImage: "url(images/man-large.jpg.webp)",
          }}
          className="h-full w-[26%] max-[900px]:w-full max-[900px]:h-[620px] bg-no-repeat bg-cover flex flex-col justify-center bg-center items-center"
        >
          <p className="text-white font-extrabold text-[50px]">{t("Men's")}</p>
          <Link
            to="/shop"
            className="text-white pb-1.5 text-lg font-semibold border-b-2 border-white border-solid"
          >
            {t("Discover More")}
          </Link>
        </div>
      </div>
    </div>
  );
}
