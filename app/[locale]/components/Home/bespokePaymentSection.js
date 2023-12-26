"use client";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import LoadingTwo from "../loadingTwo";
import { db } from "../../config/firebase";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function BespokePayment({
  close,
  exchangeRate,
  userInfo,
  date,
  availableDates,
}) {
  const [price, setPrice] = useState(20);
  const router = useRouter();
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [txRef, setTxRef] = useState(`${Date.now()}${v4()}`);
  const [dateId, setDateId] = useState(
    availableDates.filter((d) => d.date === date)[0].id
  );
  const sessionsCollectionRef = collection(db, "sessions");

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLICKEY,
    tx_ref: txRef,
    amount: price,
    currency: currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userInfo.email,
      phone_number: userInfo.phoneNumber,
      name: userInfo.name,
    },
    customizations: {
      title: `Payment from ${userInfo.name}`,
      description: "Payment for a bespoke session",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const availabeCurrencies = ["USD", "NGN"];

  function convertNairaToDollar(amountInNaira) {
    const amountInDollar = amountInNaira / exchangeRate;
    setPrice(amountInDollar.toFixed(2));
  }

  function convertDollarToNaira(amountInDollar) {
    const amountInNaira = amountInDollar * exchangeRate;
    setPrice(amountInNaira.toFixed(2));
  }

  const paymentSuccessful = async (data) => {
    setLoading(true);
    const dataToAdd = {
      sessionDate: date,
      currency: data.currency,
      date: data.created_at,
      totalAmount: price,
      reference: data.tx_ref,
      name: userInfo.name,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      address: userInfo.address,
      designType: userInfo.designType,
      indicationOfBudget: userInfo.indicationOfBudget,
      otherPurpose: userInfo.otherPurpose,
      dateOfTheEvent: userInfo.dateOfTheEvent,
      proposedOutfitPickupDate: userInfo.proposedOutfitPickupDate,
      selectedExpressService: userInfo.selectedExpressService,
      ableToFitTheOutfitInStudio: userInfo.ableToFitTheOutfitInStudio,
      shippingInformation: userInfo.shippingInformation,
      eventLocation: userInfo.eventLocation,
      eventLocationDetails: userInfo.eventLocationDetails,
      howYouWantToFeelInCinnamonPiece: userInfo.howYouWantToFeelInCinnamonPiece,
      describeStyleInThreeWords: userInfo.describeStyleInThreeWords,
      otherRelavantInformation: userInfo.otherRelavantInformation,
      purposeOfOutfit: userInfo.purposeOfOutfit,
      sizes: userInfo.sizes,
      meetingType: userInfo.meetingType,
    };
    try {
      await addDoc(sessionsCollectionRef, dataToAdd);
      await deleteDoc(doc(db, "availableDates", dateId));
      router.push("/profile");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const makePayment = () => {
    handleFlutterPayment({
      callback: async (response) => {
        if (response) {
          closePaymentModal();
          paymentSuccessful(response);
        } else {
          console.log("Failed");
          closePaymentModal();
        }
      },
      onClose: () => {
        setTxRef(`${Date.now()}${v4()}`);
      },
    });
  };

  return (
    <>
      {loading && <LoadingTwo />}
      <div className="w-full relative h-full bg-white p-5">
        <i
          onClick={close}
          className="fa-solid fa-xmark text-lg absolute right-3 top-3 cursor-pointer text-PrimaryBlack/50 hover:text-PrimaryBlack/80"
        ></i>
        <p className="text-PrimaryBlack/90 font-bold text-sm">Check Out</p>
        <p className="text-center pt-8 pb-3 font-bold text-lg text-PrimaryBlack/90">
          In-store Consultation
        </p>
        <p className="text-center font-bold text-PrimaryOrange text-xl">
          {currency === "USD" ? "$" : "₦"}
          {price}
        </p>
        <div className="pt-4">
          <select
            name="delivery method"
            className="outline-none border py-2 w-48 text-PrimaryBlack/70 font-semibold pl-2"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
              if (currency === "NGN") {
                convertNairaToDollar(price);
              } else {
                convertDollarToNaira(price);
              }
            }}
          >
            {availabeCurrencies.map((c) => {
              return (
                <option key={v4()} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={makePayment}
          className="absolute bottom-4 w-[calc(100%-40px)] bg-PrimaryOrange py-2.5 text-white text-xs font-bold hover:bg-PrimaryOrange/80"
        >
          PAY NOW
        </button>
      </div>
    </>
  );
}
