import { Link } from "react-router-dom";

import { useState } from "react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <main
      style={{ backgroundImage: `url(/images/hero-1.jpg.webp)` }}
      className="w-full h-[700px] bg-cover bg-center max-[500px]:bg-left flex items-center px-28 max-[800px]:px-5"
    >
      <div className="flex flex-col w-[450px] max-[500px]:w-full">
        <p className="pb-4 text-PrimaryBlack font-extrabold text-4xl ">
          Dive head first into success.
        </p>
        <p className="text-PrimaryBlack/70 text-sm font-semibold pb-6">
          You'll be on a luxury liner in no time. Get started with a free
          account. Sign up for a voyage of a lifetime.
        </p>
        <p className="text-PrimaryBlack text-xs font-bold pb-2">Full Name</p>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-4 outline-1 outline-PrimaryOrange py-2 text-PrimaryBlack/80 text-xs font-semibold border px-3"
        />
        <p className="text-PrimaryBlack text-xs font-bold pb-2">Email</p>
        <input
          type="email"
          value={Email}
          onChange={(e) => SetEmail(e.target.value)}
          className="w-full mb-4 outline-1 outline-PrimaryOrange py-2 text-PrimaryBlack/80 text-xs font-semibold border px-3"
        />
        <p className="text-PrimaryBlack text-xs font-bold pb-2">Password</p>
        <input
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 outline-1 outline-PrimaryOrange py-2 text-PrimaryBlack/80 text-xs font-semibold border px-3"
        />
        <div className="pb-4 flex w-full justify-center gap-4 items-center max-[500px]:flex-col">
          <button className="w-52 max-[500px]:w-full hover:bg-PrimaryOrange/70 h-10 rounded-full bg-PrimaryOrange flex justify-center items-center">
            <p className="text-xs tracking-wide text-white font-bold">
              Sign Up
            </p>
          </button>
          <p className="text-PrimaryBlack/70 text-xs font-semibold">OR</p>
          <button className="w-52 max-[500px]:w-full hover:bg-white h-10 rounded-full bg-white/40 border flex gap-2 justify-center items-center">
            <img src="/images/google-logo.png" className="w-5" alt="" />
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
            to="/sign-in"
            className="text-[11px] tracking-wide text-blue-600 font-semibold hover:underline"
          >
            Sign-In
          </Link>
        </div>
      </div>
    </main>
  );
}
