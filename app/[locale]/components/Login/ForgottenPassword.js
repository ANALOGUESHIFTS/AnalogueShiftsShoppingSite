"use client";
import { useTranslations } from "next-intl";

import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

import { useState, useEffect, useRef } from "react";
import LoadingTwo from "../loadingTwo";
import { toast } from "react-toastify";

export default function ForgottenPassword() {
  const t = useTranslations("Index");
  const [Email, SetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const containerRef = useRef();

  useEffect(() => {
    if (!loading) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, Email).then((res) => {
        setLoading(false);
        toast.success(
          "We have successfully sent a password reset link to your email!",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      });
    } catch (err) {
      setTimeout(() => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });

        setLoading(false);
      }, 1000);
    }
  }

  return (
    <>
      {loading && <LoadingTwo />}
      <main
        ref={containerRef}
        style={{ backgroundImage: `url(/images/hero-2.jpg.webp)` }}
        className="w-full h-[700px] bg-cover bg-center max-[500px]:bg-left flex items-center px-28 max-[800px]:px-5"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[450px] max-[500px]:w-full"
        >
          <p className="pb-4 text-PrimaryBlack font-extrabold text-4xl ">
            Forgotten Password
          </p>
          <p className="text-PrimaryBlack/70 text-sm font-semibold pb-6">
            Enter your Email address to recieve a password reset link
          </p>
          <p className="text-PrimaryBlack text-xs font-bold pb-2">
            {t("Email")}
          </p>
          <input
            type="email"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
            className="w-full mb-4 outline-1 outline-PrimaryOrange py-3 text-PrimaryBlack/80 text-xs font-semibold border px-3"
            required
          />

          <div className="pb-4 flex w-full justify-center gap-4 items-center max-[500px]:flex-col">
            <button
              type="submit"
              className="w-full hover:bg-PrimaryOrange/70 h-10 rounded-full bg-PrimaryOrange flex justify-center items-center"
            >
              <p className="text-xs tracking-wide text-white font-bold">
                Send Password Reset Link
              </p>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
