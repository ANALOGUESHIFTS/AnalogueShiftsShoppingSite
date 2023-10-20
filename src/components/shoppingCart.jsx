import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ShoppingCart() {
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
  const [total, setTotal] = useState(0);
  const { t, i18n } = useTranslation();

  const handleQuantityChange = (id, newQuantity) => {
    setCartProducts(
      cartProducts.map((data) => {
        if (data.id !== id) {
          return data;
        } else {
          return { ...data, quantity: Math.max(0, newQuantity) };
        }
      })
    );
  };

  const removeItem = (id) => {
    setCartProducts(cartProducts.filter((data) => data.id !== id));
  };

  useEffect(() => {
    setTotal(0);
    cartProducts.forEach((data) => {
      setTotal((prev) => (prev += data.price * data.quantity));
    });
  }, [cartProducts]);

  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main
      ref={containerRef}
      className="p-28 max-[800px]:px-5 max-[1000px]:px-12 max-[900px]:py-20"
    >
      <div className="w-full overflow-x-auto ">
        <div className="w-full border pb-8 max-[900px]:w-[700px]">
          <div className="w-full border-b grid grid-cols-6 h-14 items-center px-6 mb-6 gap-8">
            <p className="col-span-1 text-center text-PrimaryBlack font-bold text-xs">
              {t("IMAGE")}
            </p>
            <p className="col-span-2 text-PrimaryBlack font-bold text-xs">
              {t("PRODUCT NAME")}
            </p>
            <p className="col-span-1 text-PrimaryBlack font-bold text-xs">
              {t("Price").toUpperCase()}
            </p>
            <p className="col-span-1 text-PrimaryBlack font-bold text-xs">
              {t("Quantity").toUpperCase()}
            </p>
            <p className="col-span-1 text-PrimaryBlack font-bold text-xs">
              {t("Total").toUpperCase()}
            </p>
          </div>

          <div className="w-full flex flex-col gap-6">
            {cartProducts.map((data) => {
              return (
                <div
                  key={data.id}
                  className="w-full grid grid-cols-6 items-center px-6 gap-8 h-40 max-[900px]:h-20"
                >
                  <div
                    style={{ backgroundImage: `url(${data.image})` }}
                    className="h-full col-span-1 bg-cover bg-center"
                  ></div>
                  <p className="col-span-2 text-PrimaryBlack text-[17px]">
                    {data.name}
                  </p>
                  <p className="col-span-1 text-PrimaryOrange font-bold text-base">
                    ${data.price}
                  </p>
                  <div className="col-span-1">
                    <div className="flex h-9 w-auto border-2 border-solid border-PrimaryBlack/20 max-[900px]:grid max-[900px]:grid-cols-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(data.id, data.quantity - 1)
                        }
                        className="border-none max-[900px]:col-span-1 bg-transparent text-PrimaryBlack/40 font-bold text-2xl flex px-5 h-full items-center max-[900px]:text-xl max-[900px]:px-0 max-[900px]:justify-center"
                      >
                        -
                      </button>
                      <p className="px-5 h-full max-[900px]:col-span-1 flex items-center text-PrimaryBlack/70 font-semibold max-[900px]:text-sm max-[900px]:px-0 max-[900px]:justify-center">
                        {data.quantity}
                      </p>
                      <button
                        onClick={() =>
                          handleQuantityChange(data.id, data.quantity + 1)
                        }
                        className="border-none bg-transparent max-[900px]:col-span-1 text-PrimaryBlack/40 flex font-bold text-2xl px-5 h-full items-center max-[900px]:text-xl max-[900px]:px-0 max-[900px]:justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-between items-center">
                    <p className="col-span-2 text-PrimaryOrange font-bold text-base">
                      ${data.price * data.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(data.id)}
                      className="border-none bg-transparent text-PrimaryBlack/90 text-lg font-thin"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full mt-7 flex justify-between max-[900px]:flex-col">
        <div className="w-[330px] flex flex-col max-[900px]:w-full">
          <div className="flex justify-between w-full">
            <Link
              to="/shop"
              className="w-[57%] h-12 flex justify-center items-center border-2 border-solid border-black/10 text-sm text-PrimaryBlack/30 font-bold"
            >
              {t("CONTINUE SHOPPING")}
            </Link>
            <button className="w-[40%] h-12 flex justify-center items-center border-solid border-black/10 text-sm text-PrimaryBlack font-bold bg-black/10 border-2">
              {t("UPDATE CART")}
            </button>
          </div>
          <p className="pt-8 font-bold text-PrimaryBlack text-base pb-3">
            {t("DISCOUNT CODES")}
          </p>
          <div className="w-full h-12 border flex">
            <input
              type="text"
              className="w-[80%] outline-none pl-5"
              placeholder="Enter your codes"
            />
            <button className="w-[20%] h-12 flex justify-center items-center text-sm text-PrimaryBlack font-bold border-none">
              {t("Apply").toUpperCase()}
            </button>
          </div>
        </div>
        <div className="w-[330px] max-[900px]:w-full bg-black/10  grid grid-rows-3">
          <div className="row-span-1 border-x-2 border-t-2 border-solid border-black/10 w-full px-5 pt-3">
            <div className="w-full h-full flex justify-between border-b border-solid border-white">
              <p className="text-PrimaryBlack text-base font-medium">
                {t("Subtotal")}
              </p>
              <p className="text-base font-bold text-PrimaryBlack">${total}</p>
            </div>
          </div>
          <div className="row-span-1 w-full border-x-2 border-solid border-black/10 px-5 pt-3">
            <div className="w-full h-full flex justify-between border-b border-solid">
              <p className="text-base font-bold text-PrimaryBlack">
                {t("Total").toUpperCase()}
              </p>
              <p className="text-base font-bold text-PrimaryOrange">${total}</p>
            </div>
          </div>
          <Link
            to="/checkout"
            className="row-span-1 w-full flex justify-center items-center bg-PrimaryBlack text-base font-bold text-white"
          >
            {t("PROCEED TO CHECK OUT")}
          </Link>
        </div>
      </div>
    </main>
  );
}
