"use client";
import { useRef } from "react";
import BespokeForm from "./bespokeForm";

export default function DetailScreen({ close, submit, selectedDate, back }) {
  const customRef = useRef();
  return (
    <div className="w-full relative h-full bg-white p-5">
      <i
        onClick={close}
        className="fa-solid fa-xmark text-lg absolute right-3 top-3 cursor-pointer text-PrimaryBlack/50 hover:text-PrimaryBlack/80"
      ></i>
      <p className="text-PrimaryBlack/90 font-bold text-sm">Confirm Booking</p>
      <div className="flex justify-between flex-wrap gap-y-2 gap-x-2 pb-4 pt-2 border-b">
        <p className="text-PrimaryOrange tracking-wider max-[500px]:flex-wrap font-semibold text-xs flex items-center">
          <i className="fa-regular fa-calendar text-sm"></i>&nbsp;&nbsp;
          {selectedDate}
        </p>
        <p className="text-PrimaryBlack/90 tracking-wide font-bold text-xs flex items-center">
          <i className="fa-regular fa-clock text-sm"></i>&nbsp;1 hour
        </p>
      </div>
      <div className="w-full py-4 overflow-y-scroll h-[310px] px-3 max-[500px]:h-[60%]">
        <div className="w-full px-5 py-2 flex items-center gap-2 rounded-lg border">
          <i className="fa-solid fa-warning text-PrimaryOrange text-sm"></i>
          <p className="text-PrimaryBlack/90 font-bold text-xs">
            Booking will only be confirmed after checkout
          </p>
        </div>
        <div className="w-full px-5 py-2 flex items-center gap-2 rounded-lg border mt-4">
          <i className="fa-solid fa-location text-PrimaryBlack/80 text-sm"></i>
          <p className="text-PrimaryBlack/90 font-bold text-xs">
            SF1 kaduna city plaza, before kastina round about, opposite studio
            24, kadunaa Nigeria
          </p>
        </div>
        <BespokeForm formRef={customRef} submit={submit} />
      </div>
      <div className="pt-4 w-full flex justify-between">
        <button
          onClick={back}
          className="text-PrimaryBlack/80 px-8 py-2 rounded border border-PrimaryBlack/90 text-xs hover:border-PrimaryBlack/70"
        >
          Back
        </button>
        <button
          onClick={() => customRef.current.click()}
          className="text-white px-8 py-2 rounded border bg-PrimaryOrange border-PrimaryOrange/90 text-xs"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
