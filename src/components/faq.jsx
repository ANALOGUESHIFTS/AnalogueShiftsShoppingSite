import { useState, useEffect, useRef } from "react";

export default function FaqPage() {
  const [openedFaq, setOpenedFaq] = useState(1);

  const faqs = [
    {
      id: 1,
      title: "Do I need to create a cinnamon account?",
      answer:
        "You can browse our website and add items to your basket without creating an account, but to make any purchases you need to create an account by providing an email address and creating a password. Once you’ve created an account, shopping with us will be so much more convenient.",
    },
    {
      id: 2,
      title: "Where Can I Find Market Research Reports?",
      answer:
        "Once you have successfully submitted your order, you will receive an automated email confirming your order details. Your order will then be processed by our warehouse team and you’ll receive a dispatch confirmation email when your order is dispatched for delivery.",
    },
    {
      id: 3,
      title: "What shoud I do if my order isn't delivered",
      answer:
        "If your order has not been delivered within the timescales for your area, please contact us. Remember to include your order number within your message as this will help us speed up the search for your order. In the unlikely event that we’re unable to locate your parcel, we will send you a ‘Missing Parcel Claim Form’ to sign and return, which will act as a declaration of your claim. Upon receipt of your declaration, we will investigate the claim and advise you of the outcome within 4 working days. If appropriate, a refund will be issued to the credit/debit card used for your purchase AS SOON AS POSSIBLE.",
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
              height: `${openedFaq === data.id ? "auto" : "48px"}`,
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
