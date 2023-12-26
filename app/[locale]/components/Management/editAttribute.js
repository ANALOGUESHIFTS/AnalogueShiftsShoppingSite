"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function EditAttribute({
  attribute,
  submit,
  cancel,
  editValue,
}) {
  const [name, setName] = useState(editValue);

  const t = useTranslations("Index");

  const handleSubmit = () => {
    submit(name);
  };

  return (
    <div
      style={{ zIndex: 5 }}
      className="w-screen h-screen fixed flex top-0 left-0 justify-center pt-16 bg-black/20"
    >
      <div className="bg-white duration-500 rounded-lg max-w-[90%] w-[400px] h-40">
        <div className="w-full h-10 border-b flex justify-between items-center px-4">
          <p className="text-PrimaryBlack/90 text-sm font-bold">
            Edit&nbsp; {attribute}
          </p>
          <i
            onClick={cancel}
            className="fa-solid fa-xmark cursor-pointer text-PrimaryBlack/80"
          ></i>
        </div>
        <div className="w-full px-3 py-3 flex flex-col gap-3">
          <input
            type="text"
            placeholder={`${attribute} Name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2.5 outline-PrimaryOrange border text-sm text-PrimaryBlack/80 px-3"
          />
          <button
            onClick={handleSubmit}
            className=" w-full rounded flex justify-center py-2.5 text-xs text-white font-bold bg-green-600 hover:bg-green-600/80"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
}
