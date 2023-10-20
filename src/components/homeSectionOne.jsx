import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

export default function HomeSectionOne() {
  const [backgroundImage, setBackgroundImage] = useState(
    "/images/hero-1.jpg.webp"
  );
  const { t, i18n } = useTranslation();

  const handleResize = () => {
    if (window.innerWidth <= 900) {
      setBackgroundImage("");
    } else {
      setBackgroundImage("/images/hero-1.jpg.webp");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="h-[725px] flex items-center max-[900px]:justify-center relative w-full bg-no-repeat bg-center max-[900px]:h-[500px]"
    >
      <div className="bg-PrimaryOrange max-[900px]:hidden absolute top-28 left-[50%] w-40 h-40 rounded-[50%] p-1.5">
        <div className="w-full h-full border-2 border-dashed border-white rounded-[50%] flex flex-col items-center justify-center gap-1.5">
          <p className="text-3xl font-bold text-white">SALE</p>
          <p className="text-3xl font-bold text-white">50%</p>
        </div>
      </div>
      <div className="px-28 flex flex-col max-[900px]:px-0 max-w-[700px] max-[900px]:max-w-[80%] max-[900px]:w-full">
        <p className="text-PrimaryOrange text-sm font-semibold ">
          {t("BAG, KIDS")}
        </p>
        <p className=" text-PrimaryBlack font-extrabold max-[900px]:font-bold text-[60px] max-[900px]:text-4xl max-[900px]:py-2">
          {t("Black friday")}
        </p>
        <p className="text-[15px] pb-8 font-medium text-PrimaryBlack/70 leading-6">
          {t(
            "Get the Best Deals & Offers on Fashion from Cinnamon Black Friday ✨ Black Friday 2023"
          )}
        </p>
        <Link
          to="/shop"
          className="text-white bg-PrimaryOrange py-2 px-5 w-40 flex justify-center items-center text-sm"
        >
          {t("SHOP NOW")}
        </Link>
      </div>
    </div>
  );
}
