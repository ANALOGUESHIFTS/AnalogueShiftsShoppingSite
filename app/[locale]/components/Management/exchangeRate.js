"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import EditAttribute from "./editAttribute";
import { db } from "../../config/firebase";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import LoadingTwo from "../loadingTwo";
import { v4 } from "uuid";

export default function ExchangeRate() {
  const t = useTranslations("Index");
  const [dollarRate, setDollarRate] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [valueToEdit, setValueToEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [valueToDelete, setValueToDelete] = useState("");

  const exchangeRateCollectionRef = collection(db, "exchangeRate");

  useEffect(() => {
    if (valueToEdit !== "") {
      setEditModal(true);
    }
  }, [valueToEdit]);

  const getRates = async () => {
    setLoading(true);
    try {
      const data = await getDocs(exchangeRateCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setDollarRate(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Rate");
    }
  };

  const editRate = async (id, value) => {
    setLoading(true);
    const editDoc = doc(db, "exchangeRate", id);
    try {
      await updateDoc(editDoc, { dollarRate: parseInt(value) });
      getRates();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Editing Rate");
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  return (
    <>
      {editModal && (
        <EditAttribute
          attribute={"Rate"}
          cancel={() => {
            setEditModal(false);
            setValueToEdit("");
          }}
          submit={(data) => {
            setEditModal(false);
            editRate(valueToDelete, data);
          }}
          editValue={valueToEdit}
        />
      )}
      {loading && <LoadingTwo />}
      <div className="w-full">
        <div className="w-full flex justify-center">
          <p className="text-sm font-bold text-PrimaryBlack/90">
            <i className="fa-solid fa-list text-PrimaryBlack/80"></i>&nbsp;
            {t("Dollar Rate")}
          </p>
        </div>
        <div className="pt-4 w-full flex flex-col gap-5">
          {dollarRate.length &&
            dollarRate.map((rate) => {
              return (
                <div
                  key={v4()}
                  className="w-full flex items-center py-3 border-b flex-wrap gap-2 justify-between"
                >
                  <p className="text-sm  font-bold text-PrimaryBlack/90">
                    ₦{rate.dollarRate}
                  </p>
                  <div className="">
                    <div
                      onClick={() => {
                        setValueToEdit(rate.dollarRate);
                        setValueToDelete(rate.id);
                      }}
                      className="h-9 cursor-pointer w-9 flex justify-center items-center bg-black/0 hover:bg-black/20 rounded-full"
                    >
                      <i class="fa-solid text-sm fa-edit text-PrimaryBlack/90"></i>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
