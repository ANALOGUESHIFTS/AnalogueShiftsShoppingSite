"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { googleProvider, auth } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { useState, useEffect, useRef } from "react";
import LoadingTwo from "../loadingTwo";
import Image from "next/image";
export default function LoginComponent() {
  const t = useTranslations("Index");
  const pathname = usePathname();
  const router = useRouter();
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

  async function signIn() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, Email, Password).then((res) => {
        setTimeout(() => {
          setLoading(false);
          router.push(pathname.slice(0, 3).concat("/profile"));
        }, 1000);
      });
    } catch (err) {
      setTimeout(() => {
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
      setErrorMessage(err.message);
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
        <div className="flex flex-col w-[450px] max-[500px]:w-full">
          <p className="pb-4 text-PrimaryBlack font-extrabold text-4xl ">
            {t("Sign in to your account")}
          </p>
          <p className="text-PrimaryBlack/70 text-sm font-semibold pb-6">
            {t("Enter your login details to get signed in to your account")}
          </p>
          <p className="text-PrimaryBlack text-xs font-bold pb-2">
            {t("Email")}
          </p>
          <input
            type="email"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
            className="w-full mb-4 outline-1 outline-PrimaryOrange py-3 text-PrimaryBlack/80 text-xs font-semibold border px-3"
          />
          <p className="text-PrimaryBlack text-xs font-bold pb-2">Password</p>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 outline-1 outline-PrimaryOrange py-3 text-PrimaryBlack/80 text-xs font-semibold border px-3"
          />
          {errorMessage.length > 0 && (
            <p className="text-[11px] tracking-wide text-red-600 pb-4 font-semibold">
              {errorMessage}!
            </p>
          )}
          <div className="pb-4 flex w-full justify-center gap-4 items-center max-[500px]:flex-col">
            <button
              onClick={() => signIn()}
              className="w-52 max-[500px]:w-full hover:bg-PrimaryOrange/70 h-10 rounded-full bg-PrimaryOrange flex justify-center items-center"
            >
              <p className="text-xs tracking-wide text-white font-bold">
                Sign In
              </p>
            </button>
            <p className="text-PrimaryBlack/70 text-xs font-semibold">OR</p>
            <button
              onClick={signInWithGoogle}
              className="w-52 max-[500px]:w-full hover:bg-white h-10 rounded-full  flex gap-2 justify-center items-center"
            >
              <Image
                src="/images/google-logo.png"
                width={20}
                height={20}
                className="w-5"
                alt="Google Logo"
              />
              <p className="text-xs tracking-wide text-PrimaryBlack/80 font-bold">
                Sign in with Google
              </p>
            </button>
          </div>
          <div className="flex pt-2 gap-1">
            <p className="text-[11px] tracking-wide text-PrimaryBlack/80 font-semibold">
              Don't have an account?
            </p>
            <Link
              href={pathname.slice(0, 3).concat("/register")}
              className="text-[11px] tracking-wide text-blue-600 font-semibold hover:underline"
            >
              Sign-Up
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
