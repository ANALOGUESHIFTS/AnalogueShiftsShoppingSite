"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function SearchModal({ cancel }) {
  const [searchValue, setSearchValue] = useState("");
  const [initialData, setInitialData] = useState(null);
  const pathname = usePathname();
  const productsCollectionRef = collection(db, "products");

  const getProducts = async () => {
    try {
      const data = await getDocs(productsCollectionRef);
      let filteredData = data.docs.map((x) => {
        return {
          ...x.data(),
          id: x.id,
        };
      });
      setInitialData(filteredData);
    } catch (err) {
      console.error(err);
      alert("Error Fetching Products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="fixed top-0 left-0 w-screen h-screen bg-black/10 z-70 pt-10 flex flex-col items-center gap-4">
      {!initialData ? (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          {" "}
          <div
            className="absolute top-0 left-0 w-full h-full bg-transparent z-70"
            onClick={cancel}
          ></div>
          <div className="w-[1000px] z-80 max-w-[90%] h-max bg-white overflow-hidden rounded-lg border flex items-center pl-3">
            <div className="mr-3 opacity-75">
              <i className="fa-solid fa-magnifying-glass text-PrimaryBlack"></i>
            </div>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Product"
              className="text font-normal w-[calc(100%-28px)] py-3.5 outline-none border-none text-black/40 text-[15px]"
            />
          </div>
          <div className="w-[1000px] z-80 max-w-[90%] h-[300px] bg-white overflow-y-scroll rounded-lg border flex items-center py-4 px-10 max-[800px]:px-5 flex-col">
            {initialData
              .filter((data) =>
                data.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((data) => {
                return (
                  <Link
                    key={crypto.randomUUID()}
                    href={pathname.slice(0, 3).concat(`/shop/${data.id}`)}
                    className="w-full py-3 border-b text-base font-medium text-black/60 hover:text-AnalogueShiftsTextColor/70"
                  >
                    {data.name}
                  </Link>
                );
              })}
          </div>
        </>
      )}
    </section>
  );
}
