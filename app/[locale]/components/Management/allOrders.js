"use client";
import { useState, useEffect } from "react";
import LoadingTwo from "../loadingTwo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";

//DB
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export default function AllOrders() {
  const pathname = usePathname();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Index");
  const ordersCollectionRef = collection(db, "orders");

  const getOrders = async () => {
    setLoading(true);
    try {
      const data = await getDocs(ordersCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setOrders(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Fetching Orders", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {loading && <LoadingTwo />}
      <main className="w-full">
        <div className="w-full flex justify-center flex-wrap gap-12">
          <p className="text-sm font-bold text-PrimaryBlack/90">
            <i className="fa-solid fa-list text-PrimaryBlack/80"></i>&nbsp; All
            Orders
          </p>
        </div>
        <div className="w-full flex flex-col px-2 mt-3 py-2 gap-3">
          {orders[0] &&
            orders.map((order, index) => {
              return (
                <div
                  key={v4()}
                  className="border w-full h-auto p-4 rounded max-[800px]:w-full flex flex-col gap-2"
                >
                  <div className="w-full flex gap-2 items-center">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Email:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {order.email}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Date:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {order.date}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Reference:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {order.reference}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Total Amount:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {order.currency} {order.totalAmount}
                    </p>
                  </div>
                  <p className="font-bold text-sm pt-2 text-PrimaryBlack/80">
                    Product{order.products.length > 1 && "s"}
                  </p>
                  <div className="w-full flex gap-5 gap-y-5 flex-wrap">
                    {order.products.map((product, index) => {
                      return (
                        <div
                          key={v4()}
                          className="border w-[250px] h-auto p-4 rounded max-[800px]:w-full"
                        >
                          <p className="font-semibold text-sm text-PrimaryBlack py-2.5">
                            Product&nbsp;
                            {index + 1}
                          </p>
                          <p className="text-[13px] font-bold text-PrimaryBlack/80 pb-1">
                            Name:{" "}
                            {product.name.length >= 20
                              ? product.name.slice(0, 17).concat("...")
                              : product.name}
                          </p>
                          <p className="text-[13px] font-bold text-PrimaryBlack/80 pb-1">
                            Color: {product.color}
                          </p>
                          <p className="text-[13px] font-bold text-PrimaryBlack/80 pb-1">
                            Size: {product.size}
                          </p>
                          <p className="text-[13px] font-bold text-PrimaryBlack/80 pb-1">
                            Quantity: {product.quantity}
                          </p>
                          <Link
                            href={pathname
                              .slice(0, 3)
                              .concat(`/product-details/${product.productId}`)}
                          >
                            <p className="text-[13px] font-semibold hover:underline text-blue-600 pb-1">
                              View Product
                            </p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <p className="font-bold text-sm pt-2 text-PrimaryBlack/80">
                    Address
                  </p>
                  <div className="border w-max h-auto p-4 rounded max-[800px]:w-full">
                    <p className="font-semibold text-sm text-PrimaryBlack py-2.5">
                      {order.address.firstName}&nbsp;
                      {order.address.lastName}
                    </p>
                    <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                      {order.address.deliveryAddress}
                    </p>
                    <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                      {order.address.additionalInfo}
                    </p>
                    <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                      {order.address.city}, &nbsp; {order.address.region}
                    </p>
                    <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                      {order.address.phoneNumber} / &nbsp;
                      {order.address.additionalPhoneNumber}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}
