import { useState } from "react";
import Brands from "./brands";
import { useTranslation } from "react-i18next";
import Categories from "./categories";
import Tags from "./tags";
import Sizes from "./size";
import Products from "./allProducts";

export default function ManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Brand");
  const { t, i18n } = useTranslation();

  const menus = ["Brand", "Categories", "Tags", "Size", "Products"];

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
      {selectedMenu === "Brand" && <Brands />}
      {selectedMenu === "Categories" && <Categories />}
      {selectedMenu === "Tags" && <Tags />}
      {selectedMenu === "Size" && <Sizes />}
      {selectedMenu === "Products" && <Products />}
    </main>
  );
}
