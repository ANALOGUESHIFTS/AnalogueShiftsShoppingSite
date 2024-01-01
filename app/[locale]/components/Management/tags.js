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

export default function Tags() {
  const t = useTranslations("Index");
  const [tags, setTags] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [valueToEdit, setValueToEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [idiomModal, setIdiomModal] = useState(false);
  const [valueToDelete, setValueToDelete] = useState("");

  const tagsCollectionRef = collection(db, "tags");

  useEffect(() => {
    if (valueToEdit !== "") {
      setEditModal(true);
    }
  }, [valueToEdit]);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    setLoading(true);
    try {
      const data = await getDocs(tagsCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTags(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Fetching Tags", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const addTag = async (tag) => {
    setLoading(true);
    try {
      await addDoc(tagsCollectionRef, { tagName: tag });
      getTags();
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Adding tag", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const deleteTag = async (id) => {
    setLoading(true);
    const tagDoc = doc(db, "tags", id);
    try {
      await deleteDoc(tagDoc);
      getTags();
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Deleting Tag", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const editTag = async (id, value) => {
    setLoading(true);
    const tagDoc = doc(db, "tags", id);
    try {
      await updateDoc(tagDoc, { tagName: value });
      getTags();
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Editing Tag", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {modal && (
        <AddAttribute
          attribute={"Tag"}
          cancel={() => setModal(false)}
          submit={(data) => {
            setModal(false);
            addTag(data);
          }}
        />
      )}
      {editModal && (
        <EditAttribute
          attribute={"Tag"}
          cancel={() => {
            setEditModal(false);
            setValueToEdit("");
          }}
          submit={(data) => {
            setEditModal(false);
            editTag(valueToDelete, data);
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
            deleteTag(valueToDelete);
          }}
        />
      )}
      {loading && <LoadingTwo />}
      <div className="w-full">
        <div className="w-full flex justify-center flex-wrap gap-12">
          <p className="text-sm font-bold text-PrimaryBlack/90">
            <i className="fa-solid fa-list text-PrimaryBlack/80"></i>&nbsp;
            {t("All Tags")}
          </p>
          <p
            onClick={() => setModal(true)}
            className="text-sm cursor-pointer font-bold text-PrimaryBlack/90"
          >
            <i className="fa-solid fa-plus text-PrimaryBlack/80"></i>&nbsp;
            {t("Add Tag")}
          </p>
        </div>
        <div className="pt-4 w-full flex flex-col gap-5">
          {tags.map((tag) => {
            return (
              <div
                key={tag.id}
                className="w-full flex items-center py-3 border-b flex-wrap gap-2 justify-between"
              >
                <p className="text-sm  font-bold text-PrimaryBlack/90">
                  {tag.tagName}
                </p>
                <div className="flex gap-3">
                  <div
                    onClick={() => {
                      setValueToDelete(tag.id);
                      setIdiomModal(true);
                    }}
                    className="h-9 cursor-pointer w-9 flex justify-center items-center bg-black/0 hover:bg-black/20 rounded-full"
                  >
                    <i class="fa-solid fa-trash text-sm text-PrimaryBlack/90"></i>
                  </div>
                  <div
                    onClick={() => {
                      setValueToEdit(tag.tagName);
                      setValueToDelete(tag.id);
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
