import { useState, useEffect } from "react";

export default function HomeSectionOne() {
  const [backgroundImage, setBackgroundImage] = useState(
    "src/assets/images/hero-1.jpg.webp"
  );

  const handleResize = () => {
    if (window.innerWidth <= 900) {
      setBackgroundImage("");
    } else {
      setBackgroundImage("src/assets/images/hero-1.jpg.webp");
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
      <button className="border-none bg-transparent absolute top-[calc(50%-30px)] left-12 max-[900px]:left-4">
        <i className="fa-solid fa-angle-left text-PrimaryBlack/60 text-3xl hover:text-PrimaryOrange"></i>
      </button>
      <button className="border-none bg-transparent absolute top-[calc(50%-30px)] right-12 max-[900px]:right-4">
        <i className="fa-solid fa-angle-right text-PrimaryBlack/60 text-3xl hover:text-PrimaryOrange"></i>
      </button>
      <div className="bg-PrimaryOrange max-[900px]:hidden absolute top-28 left-[50%] w-40 h-40 rounded-[50%] p-1.5">
        <div className="w-full h-full border-2 border-dashed border-white rounded-[50%] flex flex-col items-center justify-center gap-1.5">
          <p className="text-3xl font-bold text-white">SALE</p>
          <p className="text-3xl font-bold text-white">50%</p>
        </div>
      </div>
      <div className="px-28 flex flex-col max-[900px]:px-0 max-w-[700px] max-[900px]:max-w-[80%] max-[900px]:w-full">
        <p className="text-PrimaryOrange text-sm font-semibold ">BAG, KIDS</p>
        <p className=" text-PrimaryBlack font-extrabold max-[900px]:font-bold text-[60px] max-[900px]:text-4xl max-[900px]:py-2">
          Black friday
        </p>
        <p className="text-[15px] pb-8 font-medium text-PrimaryBlack/70 leading-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
          deserunt eaque, illum vero ratione praesentium obcaecati officiis.
        </p>
        <button className="text-white bg-PrimaryOrange py-2 px-5 w-40">
          SHOP NOW
        </button>
      </div>
    </div>
  );
}
