import { useState, useEffect } from "react";
import CartDropdown from "./cartDropdown";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { useTranslation } from "react-i18next";

export default function HeaderComponent() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [CartDropdownDisplay, setCartDropdownDisplay] = useState(false);
  const [category, setCategory] = useState("All Categories");
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState(["All Categories"]);

  const [numberOfFavourites, setNumberOfFavourites] = useState(0);
  const [numberOfCart, setNumberOfCart] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full px-28 py-12 flex justify-between max-[1000px]:justify-around max-[900px]:gap-4 max-[900px]:py-2 max-[900px]:flex-col items-center max-[1000px]:px-12 max-[800px]:px-3">
      {/* LOGO */}
      <div
        style={{ backgroundImage: "url(/images/cinnamon-logo.png)" }}
        className="w-36 h-36 bg-cover bg-center"
      ></div>

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
        {user?.email !== "cinnamon19fashion@gmail.com" && (
          <Link to="">
            <div className="relative pt-1 pr-2">
              <div className="absolute top-0 right-0 w-4 h-4 flex justify-center items-center rounded-[50%] bg-PrimaryOrange">
                <p className="text-white text-xs">{numberOfFavourites}</p>
              </div>
              <i class="fa-regular fa-heart text-PrimaryBlack/80 text-xl"></i>
            </div>
          </Link>
        )}
        {user?.email !== "cinnamon19fashion@gmail.com" && (
          <div
            onClick={() => handleNavigation("/shopping-cart")}
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
        )}
        {user && user.email === "cinnamon19fashion@gmail.com" && (
          <Link
            to="/management"
            className="h-14 w-14 flex justify-center items-center bg-PrimaryOrange max-[900px]:w-[25%]"
          >
            <i class="fa-solid fa-gear text-white"></i>
          </Link>
        )}
      </div>
    </div>
  );
}
