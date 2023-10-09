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
    <div className="w-full px-28 py-12 flex justify-between max-[1000px]:justify-around max-[900px]:gap-4 max-[900px]:py-2 max-[900px]:flex-col items-center max-[1000px]:px-12 max-[800px]:px-3">
      {/* LOGO */}
      <img src="/src/assets/images/dummy-logo.png" alt="" />

      <div className="h-14 max-[900px]:w-[80%] border flex items-center">
        <div className="h-6 border-r max-[900px]:hidden px-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="Categories"
            className="text-PrimaryBlack w-40 cursor-pointer outline-none max-[1000px]:w-32"
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
          className="outline-none pl-4 text-PrimaryBlack/50 w-96 max-[1000px]:w-44 max-[900px]:w-[75%]"
          type="text"
        />
        <div className="h-14 w-14 flex justify-center items-center bg-PrimaryOrange max-[900px]:w-[25%]">
          <i class="fa-solid fa-magnifying-glass text-white"></i>
        </div>
      </div>
      <div className="flex items-center max-[900px]:w-[80%]">
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
