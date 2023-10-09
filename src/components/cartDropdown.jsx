import { useState } from "react";

export default function CartDropdown() {
  const [carts, setCarts] = useState([
    {
      image: "src/assets/images/select-product-1.jpg.webp",
      amount: "$60.00 x 1",
      name: "Kabino Bedside Table",
    },
    {
      image: "src/assets/images/select-product-2.jpg.webp",
      amount: "$60.00 x 1",
      name: "Kabino Bedside Table",
    },
  ]);

  return (
    <div className=" bg-white p-5 z-50 shadow-2xl w-80 absolute animate-fadeIn top-[80px] max-[900px]:-left-4 -right-4 h-96 flex flex-col gap-4">
      {carts.map((data) => {
        return (
          <div key={data.image} className="flex justify-between items-center">
            <img src={data.image} alt="" />
            <div className="flex flex-col h-full justify-around py-2">
              <p className="text-PrimaryOrange">{data.amount}</p>
              <p className="text-PrimaryBlack">{data.name}</p>
            </div>
            <p className="cursor-pointer">
              <i class="fa-solid fa-xmark text-PrimaryBlack/70"></i>
            </p>
          </div>
        );
      })}
      <div className="w-full border-b"></div>
      <div className="flex justify-between w-full">
        <p className="text-PrimaryOrange">TOTAL:</p>
        <p className="text-PrimaryOrange">$120.00</p>
      </div>
      <button className="text-white/90 font-medium bg-PrimaryBlack w-full h-12 flex justify-center items-center border-none">
        VIEW CARD
      </button>
      <button className="text-white/90 font-medium bg-PrimaryOrange w-full h-12 flex justify-center items-center border-none">
        CHECK OUT
      </button>
    </div>
  );
}
