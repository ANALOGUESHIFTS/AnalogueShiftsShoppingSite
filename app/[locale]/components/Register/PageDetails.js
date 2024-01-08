"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { googleProvider, auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { useState, useEffect, useRef } from "react";
import LoadingTwo from "../loadingTwo";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "react-toastify";
export default function RegisterComponent() {
  const t = useTranslations("Index");
  const router = useRouter();
  const pathname = usePathname();
  const [Email, SetEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef = useRef();

  useEffect(() => {
    if (!loading) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  async function signUp(e) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, Email, Password).then(
        (res) => {
          setTimeout(() => {
            setLoading(false);
            toast.success("Account Created Successfully", {
              position: "top-right",
              autoClose: 3000,
            });
            router.push(pathname.slice(0, 3).concat("/login"));
          }, 1000);
        }
      );
    } catch (err) {
      setTimeout(() => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
        setErrorMessage(err.message);
        setLoading(false);
      }, 1000);
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider).then((res) => {
        router.push(pathname.slice(0, 3).concat("/profile"));
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setErrorMessage(err.message);
    }
  }
  return (
    <>
      {loading && <LoadingTwo />}
      <main
        ref={containerRef}
        style={{ backgroundImage: `url(/images/hero-1.jpg.webp)` }}
        className="w-full h-[700px] bg-cover bg-center max-[500px]:bg-left flex items-center px-28 max-[800px]:px-5"
      >
        <form
          onSubmit={signUp}
          className="flex flex-col w-[450px] max-[500px]:w-full"
        >
          <p className="pb-4 text-PrimaryBlack font-extrabold text-4xl ">
            {t("Dive head first into success")}
          </p>
          <p className="text-PrimaryBlack/70 text-sm font-semibold pb-6">
            {t(
              "You'll be on a luxury liner in no time Get started with a free account Sign up for a voyage of a lifetime"
            )}
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
          <p className="text-PrimaryBlack text-xs font-bold pb-2">
            {t("Password")}
          </p>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 outline-1 outline-PrimaryOrange py-3 text-PrimaryBlack/80 text-xs font-semibold border px-3"
            required
          />
          {errorMessage.length > 0 && (
            <p className="text-[11px] tracking-wide text-red-600 pb-4 font-semibold">
              {errorMessage}!
            </p>
          )}
          <div className="pb-4 flex w-full justify-center gap-4 items-center max-[500px]:flex-col">
            <button
              type="submit"
              className="w-52 max-[500px]:w-full hover:bg-PrimaryOrange/70 h-10 rounded-full bg-PrimaryOrange flex justify-center items-center"
            >
              <p className="text-xs tracking-wide text-white font-bold">
                Sign Up
              </p>
            </button>
            <p className="text-PrimaryBlack/70 text-xs font-semibold">OR</p>
            <button
              onClick={signInWithGoogle}
              className="w-52 max-[500px]:w-full hover:bg-white h-10 rounded-full flex gap-2 justify-center items-center"
            >
              <Image
                src="/images/google-logo.png"
                width={20}
                height={20}
                className="w-5"
                alt="Google Logo"
              />
              <p className="text-xs tracking-wide text-PrimaryBlack/80 font-bold">
                Sign up with Google
              </p>
            </button>
          </div>
          <div className="flex pt-2 gap-1">
            <p className="text-[11px] tracking-wide text-PrimaryBlack/80 font-semibold">
              Already have an account?
            </p>
            <Link
              href={pathname.slice(0, 3).concat("/login")}
              className="text-[11px] tracking-wide text-blue-600 font-semibold hover:underline"
            >
              Sign-In
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
