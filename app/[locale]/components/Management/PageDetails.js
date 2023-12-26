"use client";
import { useEffect, useState } from "react";
import Brands from "./brands";
import { useTranslations } from "next-intl";
import Categories from "./categories";
import Tags from "./tags";
import Sizes from "./size";
import Products from "./allProducts";
import ExchangeRate from "./exchangeRate";
import AllOrders from "./allOrders";
import AllSessions from "./allSessions";
import { auth } from "../../config/firebase";
import LoadingTwo from "../loadingTwo";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function ManagementPageDetails() {
  const [selectedMenu, setSelectedMenu] = useState("Brand");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [display, setDisplay] = useState(<Brands />);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Index");

  const menus = [
    "Brand",
    "Categories",
    "Tags",
    "Size",
    "Products",
    "Exchange Rate",
    "Orders",
    "Sessions",
  ];

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user && user.email === "cinnamon19fashion@gmail.com") {
        setUser(user);
        setLoading(false);
      } else {
        router.push(pathname.slice(0, 3).concat("/"));
      }
    });
  }, []);

  useEffect(() => {
    switch (selectedMenu) {
      case "Brands":
        setDisplay(<Brands />);
        break;
      case "Categories":
        setDisplay(<Categories />);
        break;
      case "Tags":
        setDisplay(<Tags />);
        break;
      case "Size":
        setDisplay(<Sizes />);
        break;
      case "Products":
        setDisplay(<Products />);
        break;
      case "Exchange Rate":
        setDisplay(<ExchangeRate />);
        break;
      case "Orders":
        setDisplay(<AllOrders />);
        break;
      case "Sessions":
        setDisplay(<AllSessions />);
        break;
      default:
        setDisplay(<Brands />);
        break;
    }
  }, [selectedMenu]);

  return (
    <>
      {loading && <LoadingTwo />}
      <main className="px-28 py-12 max-[900px]:p-5">
        <div className="w-full flex justify-center flex-wrap pb-10 gap-6">
          {menus.map((menu) => {
            return (
              <button
                onClick={() => setSelectedMenu(menu)}
                key={menu}
                style={{
                  color: `${
                    selectedMenu === menu ? "white" : "rgba(0,0,0,0.8)"
                  }`,
                  backgroundColor: `${
                    selectedMenu === menu ? "green" : "transparent"
                  }`,
                }}
                className="py-2.5 px-8 rounded border text-sm font-bold"
              >
                {t(menu)}
              </button>
            );
          })}
        </div>
        {display}
      </main>
    </>
  );
}
