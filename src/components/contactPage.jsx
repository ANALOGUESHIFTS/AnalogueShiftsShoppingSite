import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const { t, i18n } = useTranslation();
  const contact = [
    {
      label: t("Address"),
      details:
        "SF1 kadun city plaza, before kastina round about, opposite studio 24, kaduna Nigeria",
      icon: (
        <i class="fa-solid fa-location-dot text-PrimaryBlack/50 text-2xl"></i>
      ),
    },
    {
      label: t("Phone"),
      details: "+2348031376569",
      icon: (
        <i class="fa-solid fa-mobile-screen-button text-PrimaryBlack/50 text-2xl"></i>
      ),
    },
    {
      label: t("Email"),
      details: "cinnamon19fashion@gmail.com",
      icon: (
        <i class="fa-regular fa-envelope text-PrimaryBlack/50 text-2xl"></i>
      ),
    },
  ];

  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <main
      ref={containerRef}
      className="p-28 max-[1000px]:px-12 max-[800px]:p-5"
    >
      <div className="w-full h-[560px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.8434271206647!2d7.426291370733204!3d10.512995666679817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104d35b7ed6aeb6b%3A0xf169d6f5de82493d!2sStudio%2024!5e0!3m2!1sen!2sng!4v1699003332544!5m2!1sen!2sng"
          width="100%"
          height="560"
          style={{ border: "none" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="pt-12 w-full flex justify-between max-[800px]:flex-col max-[800px]:gap-5">
        <div className="w-[46%] max-[800px]:w-full">
          <p className="font-bold text-2xl text-PrimaryBlack pb-5">
            {t("Contact Us")}
          </p>
          <p className="text-base text-PrimaryBlack/80 pb-5">
            {t("You can reach us with the following details below.")}
          </p>
          <div className="flex w-full flex-col gap-4">
            {contact.map((data) => {
              return (
                <div
                  key={data.label}
                  className="bg-white w-full h-auto py-3 rounded-lg shadow-2xl px-12 flex gap-12 items-center max-[800px]:px-3"
                >
                  {data.icon}
                  <div className="flex flex-col">
                    <p className="text-base text-PrimaryBlack/60 font-medium">
                      {data.label}:
                    </p>
                    <p className="text-base text-PrimaryBlack font-medium w-full">
                      {data.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[46%] max-[800px]:w-full">
          <p className="font-bold text-2xl text-PrimaryBlack pb-5">
            {t("Leave A Comment")}
          </p>
          <p className="text-base text-PrimaryBlack/80 pb-5">
            {t("Our staff will call back later and answer your questions.")}
          </p>
          <div className="w-full flex justify-between pb-5 max-[800px]:flex-col max-[800px]:gap-5">
            <input
              type="text"
              value={userName}
              placeholder="Your name"
              onChange={(e) => setUserName(e.target.value)}
              className="w-[47%] max-[800px]:w-full py-3 border outline-none rounded pl-4 text-PrimaryBlack/70 text-[15px]"
            />
            <input
              type="email"
              value={userEmail}
              placeholder="Your email"
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-[47%] max-[800px]:w-full py-3 border outline-none pl-4 rounded text-PrimaryBlack/70 text-[15px]"
            />
          </div>
          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            name="message"
            className="outline-none border h-40 rounded text-PrimaryBlack/70 text-[15px] px-4 py-3 w-full"
            cols="30"
            rows="10"
          ></textarea>
          <div className="pt-5">
            <button className="bg-PrimaryOrange text-white text-[15px] font-bold border-npne px-6 py-2.5">
              {t("SEND MESSAGE")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
