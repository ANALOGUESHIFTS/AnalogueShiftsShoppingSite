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

export default function Categories() {
  const t = useTranslations("Index");
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [valueToEdit, setValueToEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [idiomModal, setIdiomModal] = useState(false);
  const [valueToDelete, setValueToDelete] = useState("");

  const categoriesCollectionRef = collection(db, "categories");

  useEffect(() => {
    if (valueToEdit !== "") {
      setEditModal(true);
    }
  }, [valueToEdit]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const data = await getDocs(categoriesCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setCategories(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Categories");
    }
  };

  const addCategory = async (category) => {
    setLoading(true);
    try {
      await addDoc(categoriesCollectionRef, { categoryName: category });
      getCategories();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Adding Category");
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    const categoryDoc = doc(db, "categories", id);
    try {
      await deleteDoc(categoryDoc);
      getCategories();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Deleting Category");
    }
  };

  const editCategory = async (id, value) => {
    setLoading(true);
    const categoryDoc = doc(db, "categories", id);
    try {
      await updateDoc(categoryDoc, { categoryName: value });
      getCategories();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Editing Category");
    }
  };

  return (
    <>
      {modal && (
        <AddAttribute
          attribute={"Category"}
          cancel={() => setModal(false)}
          submit={(data) => {
            setModal(false);
            addCategory(data);
          }}
        />
      )}
      {editModal && (
        <EditAttribute
          attribute={"Category"}
          cancel={() => {
            setEditModal(false);
            setValueToEdit("");
          }}
          submit={(data) => {
            setEditModal(false);
            editCategory(valueToDelete, data);
          }}
          editValue={valueToEdit}
        />
      )}
      {idiomModal && (
        <IdiomProof
          question="Are You sure you want to delete this category?"
          cancel={() => setIdiomModal(false)}
          submit={() => {
            setIdiomModal(false);
            deleteCategory(valueToDelete);
          }}
        />
      )}
      {loading && <LoadingTwo />}
      <div className="w-full">
        <div className="w-full flex justify-center flex-wrap gap-12">
          <p className="text-sm font-bold text-PrimaryBlack/90">
            <i className="fa-solid fa-list text-PrimaryBlack/80"></i>&nbsp;
            {t("All Categories")}
          </p>
          <p
            onClick={() => setModal(true)}
            className="text-sm cursor-pointer font-bold text-PrimaryBlack/90"
          >
            <i className="fa-solid fa-plus text-PrimaryBlack/80"></i>&nbsp;
            {t("Add Category")}
          </p>
        </div>
        <div className="pt-4 w-full flex flex-col gap-5">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="w-full flex items-center py-3 border-b flex-wrap gap-2 justify-between"
              >
                <p className="text-sm  font-bold text-PrimaryBlack/90">
                  {category.categoryName}
                </p>
                <div className="flex gap-3">
                  <div
                    onClick={() => {
                      setValueToDelete(category.id);
                      setIdiomModal(true);
                    }}
                    className="h-9 cursor-pointer w-9 flex justify-center items-center bg-black/0 hover:bg-black/20 rounded-full"
                  >
                    <i class="fa-solid fa-trash text-sm text-PrimaryBlack/90"></i>
                  </div>
                  <div
                    onClick={() => {
                      setValueToEdit(category.categoryName);
                      setValueToDelete(category.id);
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
