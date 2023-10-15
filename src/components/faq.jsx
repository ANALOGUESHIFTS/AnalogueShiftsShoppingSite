import { useState, useEffect, useRef } from "react";

export default function FaqPage() {
  const [openedFaq, setOpenedFaq] = useState(1);

  const faqs = [
    {
      id: 1,
      title: "Is There Anything I Should Bring?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      title: "Where Can I Find Market Research Reports?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      title: "Where Can I Find The Wall Street Journal?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
      className="p-28 w-full flex flex-col gap-6 max-[1000px]:px-12 max-[800px]:p-5"
    >
      {faqs.map((data) => {
        return (
          <div
            style={{
              height: `${openedFaq === data.id ? "150px" : "48px"}`,
            }}
            key={data.id}
            className="duration-300 w-full flex flex-col overflow-y-hidden gap-5"
          >
            <div
              onClick={() => {
                if (openedFaq === data.id) {
                  setOpenedFaq("");
                } else {
                  setOpenedFaq(data.id);
                }
              }}
              className="h-12 flex items-center gap-5 cursor-pointer"
            >
              <div
                style={{
                  backgroundColor: `${
                    openedFaq === data.id ? "#e7ab3c" : "rgba(0,0,0,0.3)"
                  }`,
                }}
                className="w-7 h-7 flex justify-center items-center"
              >
                <p
                  style={{
                    color: `${openedFaq === data.id ? "white" : "#252525"}`,
                  }}
                  className="font-extrabold text-2xl"
                >{`${openedFaq === data.id ? "-" : "+"}`}</p>
              </div>
              <p className="font-extrabold text-xl text-PrimaryBlack">
                {data.title}
              </p>
            </div>
            <p className="w-full text-base text-PrimaryBlack/80 font-medium">
              {data.answer}
            </p>
          </div>
        );
      })}
    </main>
  );
}
