"Use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function SearchDropdown({ value }) {
  const [initialData, setInitialData] = useState([]);
  const pathname = usePathname();
  const productsCollectionRef = collection(db, "products");
  const [position, setPosition] = useState(30);
  const [opacity, setOpacity] = useState(0);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const data = await getDocs(productsCollectionRef);
      let filteredData = data.docs.map((x) => {
        return {
          ...x.data(),
          id: x.id,
        };
      });
      setInitialData(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosition(0);
    setOpacity(1);
    getProducts();
  }, []);

  return (
    <div
      style={{ opacity: opacity, transform: `translateY(${position}px)` }}
      className="absolute duration-300 w-full h-[160px] bg-white top-[110%] rounded-xl shadow-xl left-0 z-70"
    >
      {loading ? (
        <div className="w-full h-full flex justify-center items-center bg-black/10">
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
        </div>
      ) : (
        <div className="p-5 flex justify-center items-center w-full h-full">
          {value === "" && (
            <p className="text-PrimaryBlack font-semibold text-base">
              Search Product...
            </p>
          )}
          {value.trim().length > 0 &&
            initialData.filter((data) =>
              data.name.toLowerCase().includes(value.toLowerCase())
            ).length === 0 && (
              <p className="text-PrimaryBlack font-semibold text-base">
                No Product Found
              </p>
            )}
          {value.trim().length > 0 &&
            initialData.filter((data) =>
              data.name.toLowerCase().includes(value.toLowerCase())
            ).length > 0 && (
              <div className="w-full h-full overflow-y-auto flex flex-col">
                {initialData
                  .filter((data) =>
                    data.name.toLowerCase().includes(value.toLowerCase())
                  )
                  .map((data) => {
                    return (
                      <Link
                        key={crypto.randomUUID()}
                        className="w-full py-2.5 border-b text-[15px] text-PrimaryBlack/90 font-medium"
                        href={pathname.slice(0, 3).concat(`/shop/${data.id}`)}
                      >
                        {data.name}
                      </Link>
                    );
                  })}
              </div>
            )}
        </div>
      )}
    </div>
  );
}
