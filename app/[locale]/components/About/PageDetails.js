"use client";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutPageDetails() {
  const containerRef = useRef();
  const t = useTranslations("Index");

  useEffect(() => {
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <main
      ref={containerRef}
      className="px-28 py-20 max-[1000px]:px-12 max-[800px]:px-5 max-[800px]:py-5"
    >
      <div className="py-6 w-full flex justify-center">
        <Image src="/images/ceo.jpg" alt="CEO " width={500} height={700} />
      </div>
      <p className="text-PrimaryBlack font-bold text-4xl text-center pb-6">
        {t("The Brand")}
      </p>
      <p className="text-PrimaryBlack/60 font-semibold text-base leading-7">
        {t(
          "We are a home-grown, independent social enterprise with focus onfashion, lifestyle and culture; We offer new and exciting ways to experience the best in fashion from West Africa and across the globe; With focus on style, identity and authenticity; we delight in spotlighting the evolution, inspiration, and outcomes within the Nigerian fashion industry; We seek to inspire all who take pride indigenous creativity, and offer convenience for shopping through our curation of the very best collections from Africa; We work as a team that is socially empowered and with the goal to make even more meaningful, the relationships between people and the clothes that matter to them"
        )}
        .
      </p>
      <div className="py-6 w-full flex justify-center">
        <Image
          src="/images/cinnamon-logo.png"
          alt="Logo"
          width={160}
          height={160}
        />
      </div>
      <p className="text-PrimaryBlack font-bold text-4xl text-center pb-6">
        {t("The Site")}
      </p>
      <p className="text-PrimaryBlack/60 font-semibold text-base leading-7">
        {t(
          " is a virtual concept store with a high level of interest in Nigerian fashion brands; The platform features products and content that seeks to build a community of confident, self-aware and self-expressive individuals; We offer an international standard shopping experience at the tip of your fingers"
        )}
        .
      </p>
    </main>
  );
}
