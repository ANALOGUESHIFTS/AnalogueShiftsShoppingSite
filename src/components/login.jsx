import { Link } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

export default function LoginPage() {
  const [Email, SetEmail] = useState("");
  const [Password, setPassword] = useState("");

  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <main
      ref={containerRef}
      style={{ backgroundImage: `url(/images/hero-2.jpg.webp)` }}
      className="w-full h-[700px] bg-cover bg-center max-[500px]:bg-left flex items-center px-28 max-[800px]:px-5"
    >
      <div className="flex flex-col w-[450px] max-[500px]:w-full">
        <p className="pb-4 text-PrimaryBlack font-extrabold text-4xl ">
          Sign in to your account
        </p>
        <p className="text-PrimaryBlack/70 text-sm font-semibold pb-6">
          Enter your login details to get signed in to your account
        </p>
        <p className="text-PrimaryBlack text-xs font-bold pb-2">Email</p>
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
        <div className="pb-4 flex w-full justify-center gap-4 items-center max-[500px]:flex-col">
          <button className="w-52 max-[500px]:w-full hover:bg-PrimaryOrange/70 h-10 rounded-full bg-PrimaryOrange flex justify-center items-center">
            <p className="text-xs tracking-wide text-white font-bold">
              Sign In
            </p>
          </button>
          <p className="text-PrimaryBlack/70 text-xs font-semibold">OR</p>
          <button className="w-52 max-[500px]:w-full hover:bg-white h-10 rounded-full bg-white/40 border flex gap-2 justify-center items-center">
            <img src="/images/google-logo.png" className="w-5" alt="" />
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
            to="/register"
            className="text-[11px] tracking-wide text-blue-600 font-semibold hover:underline"
          >
            Sign-Up
          </Link>
        </div>
      </div>
    </main>
  );
}
