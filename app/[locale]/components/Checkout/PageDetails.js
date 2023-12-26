"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { db, auth } from "../../config/firebase";
import { v4 } from "uuid";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { onAuthStateChanged } from "firebase/auth";
import LoadingTwo from "../loadingTwo";

export default function CheckOutPageDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const [cartProducts, setCartProducts] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [deliveryMethod, setDeliveryMethod] = useState("Door Delivery");
  const [addresses, setAddresses] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(
    "Pay with Cards, Bank Transfer or USSD"
  );
  const addressCollectionRef = collection(db, "addresses");
  const cartCollectionRef = collection(db, "cartDatas");
  const exchangeRateCollectionRef = collection(db, "exchangeRate");
  const ordersCollectionRef = collection(db, "orders");
  const [couponCode, setCouponCode] = useState("");
  const t = useTranslations("Index");
  const [txRef, setTxRef] = useState(`${Date.now()}${v4()}`);
  const availabeCurrencies = ["USD", "NGN"];

  const containerRef = useRef();

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLICKEY,
    tx_ref: txRef,
    amount: total,
    currency: currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user ? user.email : "",
      phone_number: "**********",
      name: user ? user.displayName : "",
    },
    customizations: {
      title: `Payment from ${user ? user.displayName : ""}`,
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const getAddresses = async () => {
    try {
      const data = await getDocs(addressCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setAddresses(filteredData.filter((data) => data.email === user.email));
      await getRates();
      await getData();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Addresses");
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
      alert("Error Fetching Rate");
    }
  };

  const getData = async () => {
    try {
      const data = await getDocs(cartCollectionRef);
      let userData = data.docs.filter((data) => {
        return data.data().email === user.email;
      });
      const filteredData = userData.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setCartProducts(filteredData);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Data");
    }
  };

  const decreaseQuantities = async () => {
    try {
      for (let id of cartProducts) {
        const productDoc = doc(db, "products", id.productId);
        await updateDoc(productDoc, {
          availableQuantity: increment(-id.quantity),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItemsFromCart = async () => {
    try {
      for (let id of cartProducts) {
        const cartDoc = doc(db, "cartDatas", id.id);
        await deleteDoc(cartDoc);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const paymentSuccessful = async (data) => {
    setLoading(true);
    const dataToAdd = {
      currency: data.currency,
      date: data.created_at,
      email: user.email,
      name: user.displayName,
      totalAmount: total,
      reference: data.tx_ref,
      products: cartProducts.map((pro) => {
        return {
          color: pro.color,
          imagesFolder: pro.imagesFolder,
          name: pro.productName,
          productId: pro.productId,
          quantity: pro.quantity,
          size: pro.size,
        };
      }),
      address: {
        firstName: addresses[0].firstName,
        lastName: addresses[0].lastName,
        deliveryAddress: addresses[0].deliveryAddress,
        additionalInfo: addresses[0].additionalInfo,
        city: addresses[0].city,
        region: addresses[0].region,
        phoneNumber: addresses[0].phoneNumber,
        additionalPhoneNumber: addresses[0].additionalInfo,
      },
    };
    try {
      await addDoc(ordersCollectionRef, dataToAdd);
      await decreaseQuantities();
      await deleteItemsFromCart();
      setLoading(false);
      router.push(pathname.slice(0, 3).concat("/profile"));
    } catch (err) {
      setLoading(false);
      console.log(err);
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

  function convertNairaToDollar(amountInNaira) {
    const amountInDollar = amountInNaira / exchangeRate;
    setTotal(amountInDollar.toFixed(2));
  }

  function convertDollarToNaira(amountInDollar) {
    const amountInNaira = amountInDollar * exchangeRate;
    setTotal(amountInNaira.toFixed(2));
  }

  useEffect(() => {
    setLoading(true);
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push(pathname.slice(0, 3).concat("/login"));
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      getAddresses();
    }
  }, [user]);

  useEffect(() => {
    setTotal(0);
    if (cartProducts[0]) {
      cartProducts.forEach((data) => {
        setTotal((prev) => (prev += data.price * data.quantity));
      });
    }
  }, [cartProducts]);

  return (
    <>
      {loading && <LoadingTwo />}
      <main
        ref={containerRef}
        className="px-28 py-14 max-[1000px]:px-12 max-[800px]:px-5"
      >
        <p className="font-bold text-xl text-PrimaryBlack">Place your order</p>
        <div className="pt-5 w-full grid grid-cols-8 gap-24 max-[900px]:flex max-[900px]:flex-col">
          <div className="col-span-5 flex flex-col gap-5 max-[900px]:w-full">
            <div className="w-full rounded h-auto flex flex-col">
              <div className="w-full h-auto py-3 flex justify-between items-center flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-[50%] bg-green-500 flex justify-center items-center">
                    <i className="fa-solid fa-check text-white text-xs"></i>
                  </div>
                  <p className="text-PrimaryBlack font-bold text-xs tracking-wider">
                    1. {t("CUSTOMER ADDRESS")}
                  </p>
                </div>
                <Link
                  href={pathname.slice(0, 3).concat("/profile/address-book")}
                  className="flex items-center hover:underline text-[13px] text-blue-900 font-medium gap-1"
                >
                  {t("Change")}
                  <i className="fa-solid fa-angle-right text-[11px]"></i>
                </Link>
              </div>
              {addresses[0] &&
                addresses.map((address) => {
                  return (
                    <div
                      key={v4()}
                      className=" w-full h-auto p-4 rounded max-[800px]:w-full"
                    >
                      <p className="font-semibold text-sm text-PrimaryBlack py-2.5">
                        {address.firstName}&nbsp;
                        {address.lastName}
                      </p>
                      <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                        {address.deliveryAddress}
                      </p>
                      <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                        {address.additionalInfo}
                      </p>
                      <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                        {address.city}, &nbsp; {address.region}
                      </p>
                      <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                        {address.phoneNumber} / &nbsp;
                        {address.additionalPhoneNumber}
                      </p>
                    </div>
                  );
                })}
            </div>
            <div className="w-full rounded h-auto flex flex-col pb-3">
              <div className="w-full h-auto py-3 flex justify-between items-center flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-[50%] bg-green-500 flex justify-center items-center">
                    <i className="fa-solid fa-check text-white text-xs"></i>
                  </div>
                  <p className="text-PrimaryBlack font-bold text-xs tracking-wider">
                    2. {t("DELIVERY DETAILS")}
                  </p>
                </div>
                <select
                  name="delivery method"
                  className="outline-none border py-2 w-48 text-PrimaryBlack/70 font-semibold pl-2"
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                >
                  <option value="Door Delivery">Door Delivery</option>
                </select>
              </div>
              <p className="pt-3 text-base font-semibold pl-6">
                {deliveryMethod}
              </p>
              <p className="pt-2 text-PrimaryBlack font-semibold text-[13px] pl-6">
                {t("Get A free delivery for shopping via the website")}
              </p>
            </div>
            <div className="w-full rounded h-auto flex flex-col pb-3">
              <div className="w-full h-auto flex-wrap py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-[50%] bg-green-500 flex justify-center items-center">
                    <i className="fa-solid fa-check text-white text-xs"></i>
                  </div>
                  <p className="text-PrimaryBlack font-bold text-xs tracking-wider">
                    3. {t("PAYMENT METHOD")}
                  </p>
                </div>
                <select
                  name="delivery method"
                  className="outline-none border py-2 w-48 text-PrimaryBlack/70 font-semibold pl-2"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Pay with Cards, Bank Transfer or USSD">
                    Pay with Cards, Bank Transfer or USSD
                  </option>
                </select>
              </div>
              <p className="pt-3 text-base font-semibold pl-6 pb-2">
                {paymentMethod}
              </p>
            </div>
            <div className="w-full rounded h-auto flex flex-col pb-3">
              <div className="w-full h-auto flex-wrap py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-[50%] bg-green-500 flex justify-center items-center">
                    <i className="fa-solid fa-check text-white text-xs"></i>
                  </div>
                  <p className="text-PrimaryBlack font-bold text-xs tracking-wider">
                    4. {t("Currencies").toUpperCase()}
                  </p>
                </div>
                <select
                  name="delivery method"
                  className="outline-none border py-2 w-48 text-PrimaryBlack/70 font-semibold pl-2"
                  value={currency}
                  onChange={(e) => {
                    if (currency === "NGN") {
                      convertNairaToDollar(total);
                    } else {
                      convertDollarToNaira(total);
                    }
                    setCurrency(e.target.value);
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
              <p className="pt-3 text-base font-semibold pl-6 pb-2">
                {currency}
              </p>
              <p className="text-xs font-semibold text-PrimaryBlack/70 pl-6 py-2">
                {t("You will be redirected to our secure checkout page")}
              </p>
            </div>
          </div>
          <div className="col-span-3 flex flex-col max-[900px]:w-full">
            <p className=" text-PrimaryBlack font-semibold text-sm">
              {t("Order Summary")}
            </p>
            <div className="w-full flex justify-between pt-6">
              <p className="text-sm font-medium text-PrimaryBlack/90">
                {t("Item's total")} ({cartProducts.length})
              </p>
              <p className="text-sm font-semibold text-PrimaryBlack/90">
                {currency === "USD" ? "$" : "₦"}
                {total}
              </p>
            </div>
            <div className="w-full flex justify-between pt-6">
              <p className="text-sm font-medium text-PrimaryBlack/90">
                {t("Delivery fees")}
              </p>
              <p className="text-sm font-semibold text-PrimaryBlack/90">
                {/* Delivery Fees */}
              </p>
            </div>
            <div className="w-full flex justify-between pt-6">
              <p className="text-sm font-semibold text-PrimaryBlack">
                {t("Total")}
              </p>
              <p className="text-base font-semibold text-PrimaryBlack/90">
                {currency === "USD" ? "$" : "₦"}
                {total}
              </p>
            </div>
            <div className="w-full flex justify-between pt-6 items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Coupon Code"
                className="py-2.5 px-3 w-[80%] border outline-1 outline-PrimaryOrange text-PrimaryBlack/70 text-base font-semibold"
              />
              <p
                style={{
                  color: `${
                    couponCode.length > 0 ? "#e7ab3c" : "rgba(0,0,0,0.5)"
                  }`,
                }}
                className="text-sm font-semibold cursor-pointer"
              >
                {t("Apply")}
              </p>
            </div>
            <div className="w-full flex justify-between pt-6 items-center">
              <button
                className="border-none w-full flex justify-center items-center h-11 rounded text-white bg-PrimaryOrange hover:bg-PrimaryOrange/70"
                onClick={makePayment}
              >
                {t("CONFIRM ORDER")}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
