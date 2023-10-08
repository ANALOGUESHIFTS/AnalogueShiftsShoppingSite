import { useState } from "react";
import CartDropdown from "./cartDropdown";

export default function HeaderComponent() {
  const [CartDropdownDisplay, setCartDropdownDisplay] = useState(false);
  const [category, setCategory] = useState("All Categories");
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState(["All Categories"]);

  const [numberOfFavourites, setNumberOfFavourites] = useState(1);
  const [numberOfCart, setNumberOfCart] = useState(3);
  return (
    <div className="w-full px-28 py-12 flex justify-between items-center">
      {/* LOGO */}
      <img src="/src/assets/images/dummy-logo.png" alt="" />

      <div className="h-14 border flex items-center">
        <div className="h-6 border-r px-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="Categories"
            className="text-PrimaryBlack w-40 cursor-pointer outline-none"
          >
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="What do you need?"
          className="outline-none pl-4 text-PrimaryBlack/50 w-96"
          type="text"
        />
        <div className="h-14 w-14 flex justify-center items-center bg-PrimaryOrange">
          <i class="fa-solid fa-magnifying-glass text-white"></i>
        </div>
      </div>
      <div className="flex items-center">
        <a href="">
          <div className="relative pt-1 pr-2">
            <div className="absolute top-0 right-0 w-4 h-4 flex justify-center items-center rounded-[50%] bg-PrimaryOrange">
              <p className="text-white text-xs">{numberOfFavourites}</p>
            </div>
            <i class="fa-regular fa-heart text-PrimaryBlack/80 text-xl"></i>
          </div>
        </a>
        <div
          href=""
          className="relative cursor-pointer pl-4 h-[80px] flex items-center"
          onMouseEnter={() => setCartDropdownDisplay(true)}
          onMouseLeave={() => setCartDropdownDisplay(false)}
        >
          {CartDropdownDisplay && (
            <div className="w-auto h-auto">
              <CartDropdown />
            </div>
          )}
          <div className="relative pt-1 pr-2">
            <div className="absolute top-0 right-0 w-4 h-4 flex justify-center items-center rounded-[50%] bg-PrimaryOrange">
              <p className="text-white text-xs">{numberOfCart}</p>
            </div>
            <i class="fa-solid fa-bag-shopping text-PrimaryBlack/80 text-xl"></i>
          </div>
        </div>
        <p className="pl-4 text-PrimaryBlack font-medium text-lg pt-2">
          $150.00
        </p>
      </div>
    </div>
  );
}
