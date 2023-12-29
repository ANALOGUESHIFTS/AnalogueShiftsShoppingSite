"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

//Database
import { getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { collection } from "firebase/firestore";

import SearchDropdown from "./SearchDropdown";

export default function HeaderComponent() {
  const [searchValue, setSearchValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState("All Categories");
  const [categories, setCategories] = useState(["All Categories"]);
  const cartCollectionRef = collection(db, "cartDatas");
  const [dropdownModal, setDropDownModal] = useState(false);

  const [numberOfCart, setNumberOfCart] = useState(0);

  const getData = async () => {
    try {
      const data = await getDocs(cartCollectionRef);
      let userData = data.docs.filter((data) => {
        return data.data().email === user.email;
      });
      setNumberOfCart(userData.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getData();
      } else {
        setUser(null);
        setNumberOfCart(0);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  const handleNavigation = (path) => {
    if (user) {
      router.push(path);
    } else {
      router.push(pathname.slice(0, 3).concat("/login"));
    }
  };

  return (
    <div className="w-full px-28 py-12 flex justify-between max-[1000px]:justify-around max-[900px]:gap-4 max-[900px]:py-2 max-[900px]:flex-col items-center max-[1000px]:px-12 max-[800px]:px-3">
      {/* LOGO */}
      <div
        style={{ backgroundImage: "url(/images/cinnamon-logo.png)" }}
        className="w-36 h-36 bg-cover bg-center"
      ></div>

      <div className="h-14 max-[900px]:w-[80%] border flex items-center relative">
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
          onFocus={() => setDropDownModal(true)}
          onBlur={() => setTimeout(() => setDropDownModal(false), 700)}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="What do you need?"
          className="outline-none pl-4 text-PrimaryBlack/50 w-96 max-[1000px]:w-44 max-[900px]:w-[75%]"
          type="text"
        />
        <div className="h-14 w-14 flex justify-center items-center bg-PrimaryOrange max-[900px]:w-[25%]">
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </div>
        {dropdownModal && <SearchDropdown value={searchValue} />}
      </div>
      <div className="flex items-center max-[900px]:w-[80%]">
        {user?.email !== "cinnamon19fashion@gmail.com" && (
          <div
            onClick={() =>
              handleNavigation(pathname.slice(0, 3).concat("/shopping-cart"))
            }
            className="relative cursor-pointer pl-4 h-[80px] flex items-center"
          >
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
            href={pathname.slice(0, 3).concat("/management")}
            className="h-14 w-14 flex justify-center items-center bg-PrimaryOrange max-[900px]:w-[25%]"
          >
            <i class="fa-solid fa-gear text-white"></i>
          </Link>
        )}
      </div>
    </div>
  );
}
