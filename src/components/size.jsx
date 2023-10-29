import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AddAttribute from "./addAttribute";
import EditAttribute from "./editAttribute";

import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import LoadingTwo from "./loadingTwo";
import IdiomProof from "./idiomProof";

export default function Sizes() {
  const { t, i18n } = useTranslation();
  const [sizes, setSizes] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [valueToEdit, setValueToEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [idiomModal, setIdiomModal] = useState(false);
  const [valueToDelete, setValueToDelete] = useState("");

  const sizesCollectionRef = collection(db, "sizes");

  useEffect(() => {
    if (valueToEdit !== "") {
      setEditModal(true);
    }
  }, [valueToEdit]);

  useEffect(() => {
    getSizes();
  }, []);

  const getSizes = async () => {
    setLoading(true);
    try {
      const data = await getDocs(sizesCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setSizes(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Sizes");
    }
  };

  const addSize = async (size) => {
    setLoading(true);
    try {
      await addDoc(sizesCollectionRef, { sizeName: size });
      getSizes();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Adding Size");
    }
  };

  const deleteSize = async (id) => {
    setLoading(true);
    const sizeDoc = doc(db, "sizes", id);
    try {
      await deleteDoc(sizeDoc);
      getSizes();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Deleting Size");
    }
  };

  const editSize = async (id, value) => {
    setLoading(true);
    const sizeDoc = doc(db, "sizes", id);
    try {
      await updateDoc(sizeDoc, { sizeName: value });
      getSizes();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Editing Size");
    }
  };

  return (
    <>
      {modal && (
        <AddAttribute
          attribute={"Size"}
          cancel={() => setModal(false)}
          submit={(data) => {
            setModal(false);
            addSize(data);
          }}
        />
      )}
      {editModal && (
        <EditAttribute
          attribute={"Size"}
          cancel={() => {
            setEditModal(false);
            setValueToEdit("");
          }}
          submit={(data) => {
            setEditModal(false);
            editSize(valueToDelete, data);
          }}
          editValue={valueToEdit}
        />
      )}
      {idiomModal && (
        <IdiomProof
          question="Are You sure you want to delete this tag?"
          cancel={() => setIdiomModal(false)}
          submit={() => {
            setIdiomModal(false);
            deleteSize(valueToDelete);
          }}
        />
      )}
      {loading && <LoadingTwo />}
      <div className="w-full">
        <div className="w-full flex justify-center flex-wrap gap-12">
          <p className="text-sm font-bold text-PrimaryBlack/90">
            <i className="fa-solid fa-list text-PrimaryBlack/80"></i>&nbsp;
            {t("All Sizes")}
          </p>
          <p
            onClick={() => setModal(true)}
            className="text-sm cursor-pointer font-bold text-PrimaryBlack/90"
          >
            <i className="fa-solid fa-plus text-PrimaryBlack/80"></i>&nbsp;
            {t("Add Size")}
          </p>
        </div>
        <div className="pt-4 w-full flex flex-col gap-5">
          {sizes.map((size) => {
            return (
              <div
                key={size.id}
                className="w-full flex items-center py-3 border-b flex-wrap gap-2 justify-between"
              >
                <p className="text-sm  font-bold text-PrimaryBlack/90">
                  {size.sizeName}
                </p>
                <div className="flex gap-3">
                  <div
                    onClick={() => {
                      setValueToDelete(size.id);
                      setIdiomModal(true);
                    }}
                    className="h-9 cursor-pointer w-9 flex justify-center items-center bg-black/0 hover:bg-black/20 rounded-full"
                  >
                    <i class="fa-solid fa-trash text-sm text-PrimaryBlack/90"></i>
                  </div>
                  <div
                    onClick={() => {
                      setValueToEdit(size.sizeName);
                      setValueToDelete(size.id);
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
