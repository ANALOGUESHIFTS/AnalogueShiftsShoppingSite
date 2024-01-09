"use client";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import BespokePayment from "./bespokePaymentSection";
import { toast } from "react-toastify";
import PickDateScreen from "./PickDateScreen";
import LoadingScreen from "./LoadingScreen";
import DetailScreen from "./DetailScreen";

export default function BespokeModal({ close }) {
  const [screens, setScreens] = useState([
    "Loading",
    "Pick Date",
    "Details",
    "Payment",
  ]);
  const [selectedScreen, setSelectedScreen] = useState(screens[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [availableDates, setAvailableDates] = useState([]);
  const availableDatesCollectionRef = collection(db, "availableDates");
  const exchangeRateCollectionRef = collection(db, "exchangeRate");
  const [info, setInfo] = useState(null);

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

  useEffect(() => {
    getDates();
  }, []);

  return (
    <div className="fixed top-0  left-0 w-screen h-screen bg-black/25 flex justify-center items-center">
      <div className="w-[600px] max-[500px]:w-[90%] h-[500px] overflow-hidden rounded-xl z-70">
        {selectedScreen === "Pick Date" && (
          <PickDateScreen
            dates={availableDates}
            close={close}
            submit={(data) => {
              setSelectedDate(data);
              setSelectedScreen("Details");
            }}
          />
        )}
        {selectedScreen === "Loading" && <LoadingScreen />}
        {selectedScreen === "Details" && (
          <DetailScreen
            submit={(data) => {
              setInfo(data);
              setSelectedScreen("Payment");
            }}
            selectedDate={selectedDate}
            back={() => setSelectedScreen("Pick Date")}
            close={close}
          />
        )}
        {selectedScreen === "Payment" && (
          <BespokePayment
            close={close}
            exchangeRate={exchangeRate}
            userInfo={info}
            date={selectedDate}
            availableDates={availableDates}
          />
        )}
      </div>
    </div>
  );
}
