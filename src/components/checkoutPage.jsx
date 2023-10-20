import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function CheckOutPage() {
  const [cartProducts, setCartProducts] = useState([
    {
      id: 1,
      name: "Pure Pineapple",
      image: "/images/man-1.jpg",
      price: 60.0,
      quantity: 1,
    },
    {
      id: 2,
      name: "American lobster",
      image: "/images/man-2.jpg",
      price: 60.0,
      quantity: 1,
    },
    {
      id: 3,
      name: "Guangzhou sweater",
      image: "/images/man-3.jpg",
      price: 60.0,
      quantity: 1,
    },
  ]);
  const [deliveryMethod, setDeliveryMethod] = useState("Door Delivery");
  const [pickUpStation, setPickUpStation] = useState("");
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(
    "Pay with Cards, Bank Transfer or USSD"
  );
  const [couponCode, setCouponCode] = useState("");
  const { t, i18n } = useTranslation();

  const containerRef = useRef();

  useEffect(() => {
    setTotal(0);
    cartProducts.forEach((data) => {
      setTotal((prev) => (prev += data.price));
    });
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main
      ref={containerRef}
      className="px-28 py-14 max-[1000px]:px-12 max-[800px]:px-5"
    >
      <p className="font-bold text-xl text-PrimaryBlack">Place your order</p>
      <div className="pt-5 w-full grid grid-cols-8 gap-24 max-[900px]:flex max-[900px]:flex-col">
        <div className="col-span-5 flex flex-col gap-5 max-[900px]:w-full">
          <div className="w-full rounded h-28 flex flex-col">
            <div className="w-full h-auto py-3 flex justify-between items-center flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-[50%] bg-green-500 flex justify-center items-center">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <p className="text-PrimaryBlack font-bold text-xs tracking-wider">
                  1. {t("CUSTOMER ADDRESS")}
                </p>
              </div>
              <Link
                to=""
                className="flex items-center hover:underline text-[13px] text-blue-900 font-medium gap-1"
              >
                {t("Change")}
                <i className="fa-solid fa-angle-right text-[11px]"></i>
              </Link>
            </div>
          </div>
          <div className="w-full rounded h-auto flex flex-col pb-3">
            <div className="w-full h-auto py-3 flex justify-between items-center flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-[50%] bg-green-500 flex justify-center items-center">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <p className="text-PrimaryBlack font-bold text-xs tracking-wider">
                  2. {t("DELIVERY DETAILS")}
                </p>
              </div>
              <select
                name="delivery method"
                className="outline-none border py-2 w-48 text-PrimaryBlack/70 font-semibold pl-2"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option value="Door Delivery">Door Delivery</option>
                <option value="Pick-up Station">Pick-up Station</option>
              </select>
            </div>
            <p className="pt-3 text-base font-semibold pl-6">
              {deliveryMethod}
            </p>
            <p className="pt-5 text-green-600 pl-6 text-xs font-semibold">
              {t("SAVE UP TO")} ₦ 1,840
            </p>
            <p className="pt-2 text-PrimaryBlack font-semibold text-[13px] pl-6">
              {t("By switching to a pickup station starting from")} ₦ 1,520
            </p>
            {deliveryMethod === "Pick-up Station" && (
              <div className="pt-8 flex flex-col">
                <p className=" text-PrimaryBlack font-semibold text-[13px] pl-6">
                  Enter Pick-up Station
                </p>
                <input
                  type="text"
                  placeholder="Pick-up Station"
                  value={pickUpStation}
                  onChange={(e) => setPickUpStation(e.target.value)}
                  className="border outline-none mt-2 px-3 w-80 py-2 text-PrimaryBlack/70 text-sm ml-6"
                />
              </div>
            )}
          </div>
          <div className="w-full rounded h-auto flex flex-col pb-3">
            <div className="w-full h-auto flex-wrap py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-[50%] bg-green-500 flex justify-center items-center">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <p className="text-PrimaryBlack font-bold text-xs tracking-wider">
                  3. {t("PAYMENT METHOD")}
                </p>
              </div>
              <select
                name="delivery method"
                className="outline-none border py-2 w-48 text-PrimaryBlack/70 font-semibold pl-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Pay with Cards, Bank Transfer or USSD">
                  Pay with Cards, Bank Transfer or USSD
                </option>
                <option value="Pay On Delivery">Pay On Delivery</option>
              </select>
            </div>
            <p className="pt-3 text-base font-semibold pl-6 pb-2">
              {paymentMethod}
            </p>
            <p className="text-xs font-semibold text-PrimaryBlack/70 pl-6">
              {t("You will be redirected to our secure checkout page")}
            </p>
          </div>
        </div>
        <div className="col-span-3 flex flex-col max-[900px]:w-full">
          <p className=" text-PrimaryBlack font-semibold text-sm">
            {t("Order Summary")}
          </p>
          <div className="w-full flex justify-between pt-6">
            <p className="text-sm font-medium text-PrimaryBlack/90">
              {t("Item's total")} ({cartProducts.length})
            </p>
            <p className="text-sm font-semibold text-PrimaryBlack/90">
              ${total}
            </p>
          </div>
          <div className="w-full flex justify-between pt-6">
            <p className="text-sm font-medium text-PrimaryBlack/90">
              {t("Delivery fees")}
            </p>
            <p className="text-sm font-semibold text-PrimaryBlack/90">
              {/* Delivery Fees */}
            </p>
          </div>
          <div className="w-full flex justify-between pt-6">
            <p className="text-sm font-semibold text-PrimaryBlack">
              {t("Total")}
            </p>
            <p className="text-base font-semibold text-PrimaryBlack/90">
              ${total}
            </p>
          </div>
          <div className="w-full flex justify-between pt-6 items-center">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter Coupon Code"
              className="py-2.5 px-3 w-[80%] border outline-1 outline-PrimaryOrange text-PrimaryBlack/70 text-base font-semibold"
            />
            <p
              style={{
                color: `${
                  couponCode.length > 0 ? "#e7ab3c" : "rgba(0,0,0,0.5)"
                }`,
              }}
              className="text-sm font-semibold cursor-pointer"
            >
              {t("Apply")}
            </p>
          </div>
          <div className="w-full flex justify-between pt-6 items-center">
            <button className="border-none w-full flex justify-center items-center h-11 rounded text-white bg-PrimaryOrange hover:bg-PrimaryOrange/70">
              {t("CONFIRM ORDER")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
