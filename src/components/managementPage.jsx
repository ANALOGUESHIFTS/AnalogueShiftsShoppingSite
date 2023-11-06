import { useEffect, useState } from "react";
import Brands from "./brands";
import { useTranslation } from "react-i18next";
import Categories from "./categories";
import Tags from "./tags";
import Sizes from "./size";
import Products from "./allProducts";
import ExchangeRate from "./exchangeRate";
import AllOrders from "./allOrders";

export default function ManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Brand");
  const [display, setDisplay] = useState(<Brands />);
  const { t, i18n } = useTranslation();

  const menus = [
    "Brand",
    "Categories",
    "Tags",
    "Size",
    "Products",
    "Exchange Rate",
    "Orders",
  ];

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
      default:
        setDisplay(<Brands />);
        break;
    }
  }, [selectedMenu]);

  return (
    <main className="px-28 py-12">
      <div className="w-full flex justify-center flex-wrap pb-10 gap-6">
        {menus.map((menu) => {
          return (
            <button
              onClick={() => setSelectedMenu(menu)}
              key={menu}
              style={{
                color: `${selectedMenu === menu ? "white" : "rgba(0,0,0,0.8)"}`,
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
  );
}
