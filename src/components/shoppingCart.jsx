import { useState } from "react";

export default function ShoppingCart() {
  const [cartProducts, setCartProducts] = useState([
    {
      id: 1,
      name: "Pure Pineapple",
      image: "/src/assets/images/man-1.jpg",
      price: 60.0,
      quantity: 1,
    },
    {
      id: 2,
      name: "American lobster",
      image: "/src/assets/images/man-2.jpg",
      price: 60.0,
      quantity: 1,
    },
    {
      id: 3,
      name: "Guangzhou sweater",
      image: "/src/assets/images/man-3.jpg",
      price: 60.0,
      quantity: 1,
    },
  ]);

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

  return (
    <main className="p-28">
      <div className="w-full border pb-8">
        <div className="w-full border-b grid grid-cols-6 h-14 items-center px-6 mb-6 gap-8">
          <p className="col-span-1 text-center text-PrimaryBlack font-bold text-base">
            IMAGE
          </p>
          <p className="col-span-2 text-PrimaryBlack font-bold text-base">
            PRODUCT NAME
          </p>
          <p className="col-span-1 text-PrimaryBlack font-bold text-base">
            PRICE
          </p>
          <p className="col-span-1 text-PrimaryBlack font-bold text-base">
            QUANTITY
          </p>
          <p className="col-span-1 text-PrimaryBlack font-bold text-base">
            TOTAL
          </p>
        </div>

        <div className="w-full flex flex-col gap-6">
          {cartProducts.map((data) => {
            return (
              <div
                key={data.id}
                className="w-full grid grid-cols-6 items-center px-6 gap-8 h-40"
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
                  <div className="flex h-9 w-auto border-2 border-solid border-PrimaryBlack/20">
                    <button
                      onClick={() =>
                        handleQuantityChange(data.id, data.quantity - 1)
                      }
                      className="border-none bg-transparent text-PrimaryBlack/40 font-bold text-2xl flex px-5 h-full items-center"
                    >
                      -
                    </button>
                    <p className="px-5 h-full flex items-center text-PrimaryBlack/70 font-semibold">
                      {data.quantity}
                    </p>
                    <button
                      onClick={() =>
                        handleQuantityChange(data.id, data.quantity + 1)
                      }
                      className="border-none bg-transparent text-PrimaryBlack/40 flex font-bold text-2xl px-5 h-full items-center"
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
    </main>
  );
}
