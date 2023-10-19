import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AddAddress from "./addAddress";

export default function AddressBookPage() {
  const [addressModal, setAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const containerRef = useRef();

  const deleteAddress = (id) => {
    setAddresses(
      addresses
        .filter((data) => data.id !== id)
        .map((data, i) => {
          return { ...data, id: i + 1 };
        })
    );
  };

  const toggleMenu = () => {
    let elem = document.getElementById("menuBar2");
    if (elem.style.left !== "0px") {
      elem.style.left = "0px";
    } else {
      elem.style.left = "-300px";
    }
  };

  useEffect(() => {
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      {addressModal && (
        <AddAddress
          cancel={() => setAddressModal(false)}
          save={(data) => {
            setAddresses((prev) => [...prev, { id: prev.length + 1, ...data }]);
            setAddressModal(false);
          }}
        />
      )}
      <main
        className="px-20 py-7 w-full flex justify-between bg-[#efeff1] max-[1000px]:px-12 max-[800px]:px-5"
        ref={containerRef}
      >
        <aside
          id="menuBar2"
          style={{ zIndex: `${addressModal ? 1 : "auto"}` }}
          className="w-[280px] h-[500px] relative rounded-lg bg-white flex flex-col overflow-hidden max-[800px]:flex max-[800px]:top-0 max-[800px]:fixed max-[800px]:h-screen max-[800px]:shadow-xl max-[800px]:rounded-none max-[800px]:z-50 max-[800px]:left-[-300px] duration-500"
        >
          <Link
            to="/profile/"
            className="px-5 py-3 flex items-center gap-4 bg-transparent hover:bg-black/10"
          >
            <i className="fa-regular fa-user text-PrimaryBlack text-xs"></i>
            <p className="text-PrimaryBlack font-semibold text-sm">
              My Cinnamon Account
            </p>
          </Link>
          <Link
            to="/profile/address-book"
            className="  px-5 py-3 flex items-center gap-4 bg-[#d4d4d6] "
          >
            <i className="fa-solid fa-book-open text-PrimaryBlack text-xs"></i>
            <p className="text-PrimaryBlack font-semibold text-sm">
              Addresss Book
            </p>
          </Link>
          <Link
            to=""
            className="px-5 py-3 flex items-center gap-4 bg-transparent hover:bg-black/10  w-full"
          >
            <i className="fa-solid fa-right-from-bracket text-red-500 text-xs"></i>
            <p className="text-red-500 font-bold text-sm">Log Out</p>
          </Link>
        </aside>
        <section className="w-[calc(100%-300px)] h-[500px] bg-white rounded-lg max-[800px]:w-full max-[500px]:h-auto">
          <div className=" px-5 items-center border-b flex justify-between h-[50px]">
            <p className="text-PrimaryBlack/80 text-lg font-bold">
              Address Book
            </p>
            <i
              onClick={toggleMenu}
              className="fa-solid fa-bars hidden max-[800px]:flex text-PrimaryBlack/80 max-[800px]:cursor-pointer"
            ></i>
            <button
              onClick={() => setAddressModal(true)}
              className="px-6 py-2 max-[800px]:hidden rounded shadow-xl hover:bg-PrimaryOrange/80 bg-PrimaryOrange text-white font-bold text-xs"
            >
              ADD NEW ADDRESS &nbsp; <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="py-3 w-full border-b max-[800px]:flex justify-center hidden">
            <button
              onClick={() => setAddressModal(true)}
              className="px-6 py-2 rounded shadow-xl hover:bg-PrimaryOrange/80 bg-PrimaryOrange text-white font-bold text-xs"
            >
              ADD NEW ADDRESS &nbsp; <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="p-4 w-full flex flex-wrap gap-4 gap-y-4">
            {addresses.map((address, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedAddress(index)}
                  style={{
                    backgroundColor: `${
                      selectedAddress === index
                        ? "rgba(231,171,60,0.3)"
                        : "transparent"
                    }`,
                  }}
                  className="border w-[calc(50%-8px)] h-auto p-4 rounded max-[800px]:w-full"
                >
                  <div className="w-full h-[35px] border-b flex items-center justify-between">
                    <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                      ADDRESS {address.id}
                    </p>
                    <button onClick={() => deleteAddress(address.id)}>
                      <i className="fa-solid fa-trash cursor-pointer text-PrimaryBlack/90 text-sm"></i>
                    </button>
                  </div>
                  <p className="font-semibold text-sm text-PrimaryBlack py-2.5">
                    {address["First Name"]}&nbsp;
                    {address["Last Name"]}
                  </p>
                  <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                    {address["Delivery Address"]}
                  </p>
                  <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                    {address["Additional Info"]}
                  </p>
                  <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                    {address["City"]}, &nbsp; {address["Region"]}
                  </p>
                  <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                    {address["Phone Number"]} / &nbsp;
                    {address["Additional Phone Number"]}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
