"use client";
import { useState, useEffect, useRef } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import BespokeForm from "./bespokeForm";
import BespokePayment from "./bespokePaymentSection";
import CalenderImage from "@/public/images/default-calendar.png";
import Image from "next/image";
import { toast } from "react-toastify";

export default function BespokeModal({ close }) {
  const [screens, setScreens] = useState([
    "Loading",
    "Pick Date",
    "Details",
    "Payment",
  ]);
  const [selectedScreen, setSelectedScreen] = useState(screens[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [element, setElement] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [availableDates, setAvailableDates] = useState([]);
  const availableDatesCollectionRef = collection(db, "availableDates");
  const exchangeRateCollectionRef = collection(db, "exchangeRate");
  const [info, setInfo] = useState(null);
  const customRef = useRef();

  const getDates = async () => {
    try {
      const data = await getDocs(availableDatesCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setAvailableDates(
        filteredData
          .filter((date) => new Date() < new Date(date.date))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      await getRates();
      setSelectedScreen("Pick Date");
    } catch (err) {
      console.log(err);
      setSelectedScreen("Pick Date");
    }
  };
  const getRates = async () => {
    try {
      const data = await getDocs(exchangeRateCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setExchangeRate(filteredData[0].dollarRate);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Fetching Rate", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const loadingScreen = (
    <div className="w-full h-full bg-white flex justify-center items-center">
      <div className="lds-roller spin-black">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  const pickDateScreen = (
    <div className="w-full relative h-full bg-[#eed6d0] flex flex-col items-center pt-12">
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
          name="Date"
          onChange={(e) => setSelectedDate(e.target.value)}
          className="outline-none  border w-full px-4 py-2.5 bg-white text-sm font-semibold text-PrimaryBlack/80 cursor-pointer"
        >
          <option value="">Select Date</option>
          {availableDates.map((date) => {
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
          onClick={() => setSelectedScreen("Details")}
          className="text-PrimaryBlack/80 text-sm font-semibold px-8 py-2 rounded bg-white border hover:bg-PrimaryBlack/80 hover:text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const detailScreen = (
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
      <div className="w-full py-4 overflow-y-scroll h-[350px] px-3 max-[500px]:h-[60%]">
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
        <BespokeForm
          formRef={customRef}
          submit={(data) => {
            setInfo(data);
            setSelectedScreen("Payment");
          }}
        />
      </div>
      <div className="pt-4 w-full flex justify-between">
        <button
          onClick={() => setSelectedScreen("Pick Date")}
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

  useEffect(() => {
    switch (selectedScreen) {
      case "Loading":
        setElement(loadingScreen);
        break;
      case "Pick Date":
        setElement(pickDateScreen);
        break;
      case "Details":
        setElement(detailScreen);
        break;
      case "Payment":
        setElement(
          <BespokePayment
            close={close}
            exchangeRate={exchangeRate}
            userInfo={info}
            date={selectedDate}
            availableDates={availableDates}
          />
        );
        break;
      default:
        setElement(loadingScreen);
        break;
    }
  }, [selectedScreen]);

  useEffect(() => {
    getDates();
  }, []);

  return (
    <div className="fixed top-0  left-0 w-screen h-screen bg-black/25 flex justify-center items-center">
      <div className="w-[600px] max-[500px]:w-[90%] h-[500px] overflow-hidden rounded-xl">
        {element}
      </div>
    </div>
  );
}
