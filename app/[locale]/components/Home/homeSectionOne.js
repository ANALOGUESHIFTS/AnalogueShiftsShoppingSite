"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  deleteDoc,
  doc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";

import { useTranslations } from "next-intl";

export default function HomeSectionOne() {
  const [backgroundImage, setBackgroundImage] = useState(
    "/images/hero-1.jpg.webp"
  );
  const pathname = usePathname();
  const t = useTranslations("Index");
  const availableDatesCollectionRef = collection(db, "availableDates");

  const handleResize = () => {
    if (window.innerWidth <= 900) {
      setBackgroundImage("");
    } else {
      setBackgroundImage("/images/hero-1.jpg.webp");
    }
  };

  const deleteDate = async () => {
    try {
      const data = await getDocs(availableDatesCollectionRef);
      data.docs.forEach((item) => {
        deleteDoc(doc(db, "availableDates", item.id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addDate = async (date) => {
    try {
      await addDoc(availableDatesCollectionRef, { date: date });
    } catch (err) {
      console.error(err);
    }
  };

  function uploadMonth(year, month) {
    var firstDayOfMonth = new Date(year, month - 1, 1);
    var firstDayOfWeek = firstDayOfMonth.getDay();
    var offsetToThirdWeek = (2 - firstDayOfWeek + 7) % 7;
    var firstDayOfThirdWeek = new Date(firstDayOfMonth);
    firstDayOfThirdWeek.setDate(
      firstDayOfThirdWeek.getDate() + offsetToThirdWeek + 7 * 2
    );
    var firstFiveDays = [];
    for (var i = -1; i < 4; i++) {
      var currentDay = new Date(firstDayOfThirdWeek);
      currentDay.setDate(firstDayOfThirdWeek.getDate() + i);
      firstFiveDays.push(
        currentDay + " (10:00 AM - 11:00 AM)",
        currentDay + " (11:00 AM - 11:00 PM)"
      );
    }

    for (let date of firstFiveDays) {
      addDate(date);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="h-[725px] flex items-center max-[900px]:justify-center relative w-full bg-no-repeat bg-center max-[900px]:h-[500px]"
    >
      <div className="bg-PrimaryOrange max-[900px]:hidden absolute top-28 left-[50%] w-40 h-40 rounded-[50%] p-1.5">
        <div className="w-full h-full border-2 border-dashed border-white rounded-[50%] flex flex-col items-center justify-center gap-1.5">
          <p className="text-3xl font-bold text-white">SALE</p>
          <p className="text-3xl font-bold text-white">50%</p>
        </div>
      </div>
      <div className="px-28 flex flex-col max-[900px]:px-0 max-w-[700px] max-[900px]:max-w-[80%] max-[900px]:w-full">
        <p className="text-PrimaryOrange text-sm font-semibold ">
          {t("BAG, KIDS")}
        </p>
        <p className=" text-PrimaryBlack font-extrabold max-[900px]:font-bold text-[60px] max-[900px]:text-4xl max-[900px]:py-2">
          {t("Black friday")}
        </p>
        <p className="text-[15px] pb-8 font-medium text-PrimaryBlack/70 leading-6">
          {t(
            "Get the Best Deals & Offers on Fashion from Cinnamon Black Friday ✨ Black Friday 2023"
          )}
        </p>
        <Link
          href={pathname.slice(0, 3).concat("/shop")}
          className="text-white bg-PrimaryOrange py-2 px-5 w-40 flex justify-center items-center text-sm"
        >
          {t("SHOP NOW")}
        </Link>
      </div>
    </div>
  );
}
