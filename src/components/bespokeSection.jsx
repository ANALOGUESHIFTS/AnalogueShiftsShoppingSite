import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import BespokeModal from "./bespokeModal";

export default function BespokeSection({ isLocked }) {
  const { t, i18n } = useTranslation();
  const [popUp, setPopUp] = useState(false);

  return (
    <>
      {popUp && <BespokeModal close={() => setPopUp(false)} />}
      <div className="px-28 py-14 max-[1000px]:px-12 max-[800px]:px-5 max-[900px]:flex-col max-[900px]:h-auto flex justify-center gap-10 h-[600px]">
        <div
          style={{
            backgroundImage: "url(/images/consultation.webp)",
          }}
          className="w-[400px] max-[500px]:w-[90%] h-full max-[900px]:h-[500px] bg-center bg-cover bg-no-repeat"
        ></div>

        <div className="w-[500px] max-[500px]:w-[90%]  max-[900px]:h-[500px] h-full pt-4">
          {isLocked && (
            <p className="pt-10 -translate-y-8 text-red-600 font-semibold text-sm tracking-wide leading-6">
              Section Locked
            </p>
          )}
          <i className="text-PrimaryBlack/70 font-thin text-2xl tracking-wide">
            In-store Consultation 40 min
          </i>
          <p className="py-6 border-b text-2xl font-semibold text-PrimaryBlack/70">
            $20.00
          </p>
          <p className="pt-10 text-PrimaryBlack/70 font-semibold text-sm tracking-wide leading-6">
            Are you ready to stun the world at your next event? We accompany our
            clients through every moment of their life, creating a Cinnamon fit
            just for you.
          </p>
          <p className="pt-5 pb-10 text-PrimaryBlack/70 font-semibold text-sm tracking-wide leading-6">
            Please note the timezone in the calendar for the in-store
            consultation is Lagos, Nigeria.
          </p>
          <button
            disabled={isLocked ? true : false}
            onClick={() => setPopUp(true)}
            className="w-full py-3 flex justify-center items-center border-PrimaryOrange border-solid border text-sm font-semibold text-PrimaryOrange hover:bg-PrimaryOrange hover:text-white"
          >
            Book now
          </button>
        </div>
      </div>
    </>
  );
}
