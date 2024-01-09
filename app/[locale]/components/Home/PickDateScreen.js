"use client";
import { useState } from "react";
import CalenderImage from "@/public/images/default-calendar.png";
import Image from "next/image";

export default function PickDateScreen({ close, submit, dates }) {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="w-full z-80 relative h-full bg-[#eed6d0] flex flex-col items-center pt-12">
      <i
        onClick={close}
        className="fa-solid fa-xmark text-lg absolute right-3 top-3 cursor-pointer text-PrimaryBlack/50 hover:text-PrimaryBlack/80"
      ></i>
      <Image
        src={CalenderImage}
        className="w-[60px] h-[60px] rounded-full border-4 border-solid"
        alt=""
      />
      <p className="text-PrimaryBlack/80 text-base pt-5 font-semibold">
        Bespoke Dresses Consultation
      </p>
      <div className="pt-5 w-full px-8">
        <select
          value={selectedDate}
          name="Date"
          onChange={(e) => setSelectedDate(e.target.value)}
          className="outline-none  border w-full px-4 py-2.5 bg-white text-sm font-semibold text-PrimaryBlack/80 cursor-pointer"
        >
          <option value="">Select Date</option>
          {dates.map((date) => {
            return (
              <option key={date.date} value={date.date}>
                {date.date}
              </option>
            );
          })}
        </select>
      </div>
      <div className="absolute bottom-5 right-5">
        <button
          onClick={() => {
            if (selectedDate !== "") {
              submit(selectedDate);
            }
          }}
          className="text-PrimaryBlack/80 text-sm font-semibold px-8 py-2 rounded bg-white border hover:bg-PrimaryBlack/80 hover:text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
