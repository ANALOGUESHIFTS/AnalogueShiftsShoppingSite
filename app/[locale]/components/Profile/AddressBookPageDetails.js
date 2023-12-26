"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoadingTwo from "../loadingTwo";
import AddAddress from "./addAddress";
import IdiomProof from "./idiomProof";
import { db, auth } from "../../config/firebase";
import { v4 } from "uuid";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import EditAddress from "./editAddress";

export default function AddressBookPageDetails() {
  const [addressModal, setAddressModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const t = useTranslations("Index");
  const containerRef = useRef();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [user, setUser] = useState({});
  const addressCollectionRef = collection(db, "addresses");

  const getAddresses = async () => {
    setLoading(true);
    try {
      const data = await getDocs(addressCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setAddresses(filteredData.filter((data) => data.email === user.email));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Addresses");
    }
  };

  const deleteAddress = async () => {
    setLoading(true);
    const addressDoc = doc(db, "addresses", addresses[0].id);
    try {
      await deleteDoc(addressDoc);
      getAddresses();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Deleting Address");
    }
  };

  const addAddress = async (data) => {
    setLoading(true);
    try {
      await addDoc(addressCollectionRef, data);
      getAddresses();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Adding Address");
    }
  };

  const editAddress = async (data) => {
    setLoading(true);
    const addressDoc = doc(db, "addresses", addresses[0].id);
    try {
      await updateDoc(addressDoc, data);
      getAddresses();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Editing Address");
    }
  };

  const toggleMenu = () => {
    let elem = document.getElementById("menuBar2");
    if (elem.style.left !== "0px") {
      elem.style.left = "0px";
    } else {
      elem.style.left = "-300px";
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      signOut(auth).then(() => {
        router.push(pathname.slice(0, 3).concat("/"));
      });
    } catch (err) {
      alert("Error Signing Out, Please Try Again");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAddresses();
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        console.log(user);
      } else {
        router.push(pathname.slice(0, 3).concat("/login"));
      }
    });
  }, []);

  useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  useEffect(() => {
    if (!loading) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);
  return (
    <>
      {loading && <LoadingTwo />}
      {logoutModal && (
        <IdiomProof
          cancel={() => setLogoutModal(false)}
          submit={() => {
            setLogoutModal(false);
            logOut();
          }}
          question={"Are you sure you want to sign out of your account?"}
        />
      )}
      {addressModal && (
        <AddAddress
          cancel={() => setAddressModal(false)}
          save={(data) => {
            setAddressModal(false);
            addAddress({
              email: user.email,
              firstName: data["First Name"],
              lastName: data["Last Name"],
              phoneNumber: data["Phone Number"],
              additionalPhoneNumber: data["Additional Phone Number"],
              deliveryAddress: data["Delivery Address"],
              additionalInfo: data["Additional Info"],
              region: data["Region"],
              city: data["City"],
            });
          }}
        />
      )}
      {editModal && (
        <EditAddress
          cancel={() => setEditModal(false)}
          save={(data) => {
            setEditModal(false);
            editAddress({
              email: user.email,
              firstName: data["First Name"],
              lastName: data["Last Name"],
              phoneNumber: data["Phone Number"],
              additionalPhoneNumber: data["Additional Phone Number"],
              deliveryAddress: data["Delivery Address"],
              additionalInfo: data["Additional Info"],
              region: data["Region"],
              city: data["City"],
            });
          }}
          recentData={addresses[0]}
        />
      )}
      <main
        className="px-20 py-7 w-full flex justify-between bg-[#efeff1] max-[1000px]:px-12 max-[800px]:px-5"
        ref={containerRef}
      >
        <aside
          id="menuBar2"
          style={{ zIndex: `${loading || logoutModal ? 1 : "auto"}` }}
          className="w-[280px] h-[500px] relative rounded-lg bg-white flex flex-col overflow-hidden max-[800px]:flex max-[800px]:top-0 max-[800px]:fixed max-[800px]:h-screen max-[800px]:shadow-xl max-[800px]:rounded-none max-[800px]:z-50 max-[800px]:left-[-300px] duration-500"
        >
          <Link
            href={pathname.slice(0, 3).concat("/profile/")}
            className="px-5 py-3 flex items-center gap-4 bg-transparent hover:bg-black/10"
          >
            <i className="fa-regular fa-user text-PrimaryBlack text-xs"></i>
            <p className="text-PrimaryBlack font-semibold text-sm">
              {t("My Cinnamon Account")}
            </p>
          </Link>
          <Link
            href={pathname.slice(0, 3).concat("/profile/address-book")}
            className="  px-5 py-3 flex items-center gap-4 bg-[#d4d4d6] "
          >
            <i className="fa-solid fa-book-open text-PrimaryBlack text-xs"></i>
            <p className="text-PrimaryBlack font-semibold text-sm">
              {t("Address Book")}
            </p>
          </Link>
          <div
            onClick={() => setLogoutModal(true)}
            className="px-5 cursor-pointer py-3 flex items-center gap-4 bg-transparent w-full hover:bg-black/10"
          >
            <i className="fa-solid fa-right-from-bracket text-red-500 text-xs"></i>
            <p className="text-red-500 font-bold text-sm">{t("Log Out")}</p>
          </div>
        </aside>
        <section className="w-[calc(100%-300px)] h-[500px] bg-white rounded-lg max-[800px]:w-full max-[500px]:h-auto">
          <div className=" px-5 items-center border-b flex justify-between h-[60px]">
            <p className="text-PrimaryBlack/80 text-sm font-bold">
              {t("Addresss Book")}
            </p>
            <button className="hidden max-[800px]:flex text-PrimaryBlack/80 max-[800px]:cursor-pointer">
              <i onClick={toggleMenu} className="fa-solid fa-bars "></i>
            </button>
            {!addresses[0] && (
              <button
                onClick={() => setAddressModal(true)}
                className="px-6 py-2 max-[800px]:hidden rounded hover:bg-PrimaryOrange/80 bg-PrimaryOrange text-white font-bold text-xs"
              >
                {t("ADD NEW ADDRESS")} &nbsp;{" "}
                <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </div>
          {!addresses[0] && (
            <div className="py-3 w-full border-b max-[800px]:flex justify-center hidden">
              <button
                onClick={() => setAddressModal(true)}
                className="px-6 py-2 rounded shadow-xl hover:bg-PrimaryOrange/80 bg-PrimaryOrange text-white font-bold text-xs"
              >
                {t("ADD NEW ADDRESS")} &nbsp;{" "}
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          )}
          <div className="p-4 w-full overflow-y-auto h-[calc(100%-90px)] flex flex-wrap gap-4 gap-y-4">
            {addresses[0] &&
              addresses.map((address, index) => {
                return (
                  <div
                    key={v4()}
                    className="border w-[calc(50%-8px)] h-auto p-4 rounded max-[800px]:w-full"
                  >
                    <div className="w-full h-[35px] border-b flex items-center justify-end gap-5">
                      <button onClick={() => setEditModal(true)}>
                        <i className="fa-solid fa-edit cursor-pointer text-PrimaryBlack/90 text-sm"></i>
                      </button>
                      <button onClick={() => deleteAddress()}>
                        <i className="fa-solid fa-trash cursor-pointer text-PrimaryBlack/90 text-sm"></i>
                      </button>
                    </div>
                    <p className="font-semibold text-sm text-PrimaryBlack py-2.5">
                      {address && address.firstName}&nbsp;
                      {address && address.lastName}
                    </p>
                    <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                      {address && address.deliveryAddress}
                    </p>
                    <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                      {address && address.additionalInfo}
                    </p>
                    <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                      {address && address.city}, &nbsp;{" "}
                      {address && address.region}
                    </p>
                    <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                      {address && address.phoneNumber} / &nbsp;
                      {address && address.additionalPhoneNumber}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
}
