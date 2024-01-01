"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import AddAttribute from "./addAttribute";
import EditAttribute from "./editAttribute";
import { db } from "../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import LoadingTwo from "../loadingTwo";
import IdiomProof from "../Profile/idiomProof";
import { toast } from "react-toastify";

export default function Brands() {
  const t = useTranslations("Index");
  const [brands, setBrands] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [valueToEdit, setValueToEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [idiomModal, setIdiomModal] = useState(false);
  const [valueToDelete, setValueToDelete] = useState("");

  const brandsCollectionRef = collection(db, "brands");

  useEffect(() => {
    if (valueToEdit !== "") {
      setEditModal(true);
    }
  }, [valueToEdit]);

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    setLoading(true);
    try {
      const data = await getDocs(brandsCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setBrands(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Fetching Brands", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const addBrand = async (brand) => {
    setLoading(true);
    try {
      await addDoc(brandsCollectionRef, { brandName: brand });
      getBrands();
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Adding Brand", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const deleteBrand = async (id) => {
    setLoading(true);
    const brandDoc = doc(db, "brands", id);
    try {
      await deleteDoc(brandDoc);
      getBrands();
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Deleting Brand", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const editBrand = async (id, value) => {
    setLoading(true);
    const brandDoc = doc(db, "brands", id);
    try {
      await updateDoc(brandDoc, { brandName: value });
      getBrands();
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Editing Brand", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {modal && (
        <AddAttribute
          attribute={"Brand"}
          cancel={() => setModal(false)}
          submit={(data) => {
            setModal(false);
            addBrand(data);
          }}
        />
      )}
      {editModal && (
        <EditAttribute
          attribute={"Brand"}
          cancel={() => {
            setEditModal(false);
            setValueToEdit("");
          }}
          submit={(data) => {
            setEditModal(false);
            editBrand(valueToDelete, data);
          }}
          editValue={valueToEdit}
        />
      )}
      {idiomModal && (
        <IdiomProof
          question="Are You sure you want to delete this brand?"
          cancel={() => setIdiomModal(false)}
          submit={() => {
            setIdiomModal(false);
            deleteBrand(valueToDelete);
          }}
        />
      )}
      {loading && <LoadingTwo />}
      <div className="w-full">
        <div className="w-full flex justify-center flex-wrap gap-12">
          <p className="text-sm font-bold text-PrimaryBlack/90">
            <i className="fa-solid fa-list text-PrimaryBlack/80"></i>&nbsp;
            {t("All Brands")}
          </p>
          <p
            onClick={() => setModal(true)}
            className="text-sm cursor-pointer font-bold text-PrimaryBlack/90"
          >
            <i className="fa-solid fa-plus text-PrimaryBlack/80"></i>&nbsp;
            {t("Add Brand")}
          </p>
        </div>
        <div className="pt-4 w-full flex flex-col gap-5">
          {brands.length &&
            brands.map((brand) => {
              return (
                <div
                  key={brand.id}
                  className="w-full flex items-center py-3 border-b flex-wrap gap-2 justify-between"
                >
                  <p className="text-sm  font-bold text-PrimaryBlack/90">
                    {brand.brandName}
                  </p>
                  <div className="flex gap-3">
                    <div
                      onClick={() => {
                        setValueToDelete(brand.id);
                        setIdiomModal(true);
                      }}
                      className="h-9 cursor-pointer w-9 flex justify-center items-center bg-black/0 hover:bg-black/20 rounded-full"
                    >
                      <i class="fa-solid fa-trash text-sm text-PrimaryBlack/90"></i>
                    </div>
                    <div
                      onClick={() => {
                        setValueToEdit(brand.brandName);
                        setValueToDelete(brand.id);
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
