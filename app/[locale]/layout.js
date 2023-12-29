import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Layout/Footer";
import NavBarComponent from "./components/Layout/NavBar";
import Script from "next/script";
import TopbarComponent from "./components/Layout/TopBar";
import HeaderComponent from "./components/Layout/Header";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";

// Can be imported from a shared config
const locales = ["en", "de", "es", "fr"];

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cinnamon19Fashion",
  description:
    "Welcome to Cinnamon19Fashion, where style meets convenience. Discover the latest trends in apparel, from chic streetwear to elegant evening dresses. Browse a curated collection of high-quality fashion wear, ensuring you're always on point with your style game. Elevate your wardrobe with our diverse range of clothing.",
  openGraph: {
    title: "Cinnamon19Fashion",
    description:
      "Welcome to Cinnamon19Fashion, where style meets convenience. Discover the latest trends in apparel, from chic streetwear to elegant evening dresses. Browse a curated collection of high-quality fashion wear, ensuring you're always on point with your style game. Elevate your wardrobe with our diverse range of clothing.",
    url: "https://cinnamon19fashion.com",
    siteName: "Cinnamon19Fashion",
    images: [
      {
        url: "/images/ceo.jpg",
        width: 600,
        height: 800,
      },
    ],
    locale: "en_US",
    type: "website",
    alternates: {
      canonical: "https://cinnamon19fashion.com",
    },
  },
};

export default function RootLayout({ children, params: { locale } }) {
  const messages = useMessages();
  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main className="w-full">
            <TopbarComponent />
            <HeaderComponent />
            <NavBarComponent />
            {children}
            <Footer />
          </main>
        </NextIntlClientProvider>
      </body>
      <Script
        src="https://kit.fontawesome.com/39a80cd06c.js"
        crossorigin="anonymous"
      />
    </html>
  );
}
