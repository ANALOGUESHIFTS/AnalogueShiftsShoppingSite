import { useState } from "react";

export default function HomeSectionOne() {
  const [backgroundImage, setBackgroundImage] = useState(
    "/src/assets/images/hero-1.jpg.webp"
  );
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="h-[725px] flex items-center relative w-full bg-no-repeat bg-center"
    >
      <button className="border-none bg-transparent absolute top-[calc(50%-30px)] left-12">
        <i className="fa-solid fa-angle-left text-PrimaryBlack/60 text-3xl hover:text-PrimaryOrange"></i>
      </button>
      <button className="border-none bg-transparent absolute top-[calc(50%-30px)] right-12">
        <i className="fa-solid fa-angle-right text-PrimaryBlack/60 text-3xl hover:text-PrimaryOrange"></i>
      </button>
      <div className="bg-PrimaryOrange absolute top-28 left-[50%] w-40 h-40 rounded-[50%] p-1.5">
        <div className="w-full h-full border-2 border-dashed border-white rounded-[50%] flex flex-col items-center justify-center gap-1.5">
          <p className="text-3xl font-bold text-white">SALE</p>
          <p className="text-3xl font-bold text-white">50%</p>
        </div>
      </div>
      <div className="px-28 flex flex-col w-90% max-w-[700px]">
        <p className="text-PrimaryOrange text-sm font-semibold ">BAG, KIDS</p>
        <p className=" text-PrimaryBlack font-extrabold text-[60px] ">
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
