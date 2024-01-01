import ShopPageDetails from "../components/Shop/PageDetails";

export const metadata = {
  title: "Shop | Cinnamon19Fashion",
  description:
    "Welcome to the Shop page at Cinnamon19Fashion, the heart of your fashion exploration. Immerse yourself in a curated collection of the latest trends, timeless classics, and must-have pieces. Our Shop page is designed for effortless navigation, allowing you to discover fashion that speaks to your individual style. From chic streetwear to elegant evening attire, each category is a gateway to a world of possibilities. Enjoy a seamless shopping experience, secure transactions, and stay ahead of the fashion curve. Thank you for choosing Cinnamon19Fashion, where the Shop page is your portal to a wardrobe that reflects your unique personality. Happy browsing!",
  openGraph: {
    title: "Shop | Cinnamon19Fashion",
    description:
      "Welcome to the Shop page at Cinnamon19Fashion, the heart of your fashion exploration. Immerse yourself in a curated collection of the latest trends, timeless classics, and must-have pieces. Our Shop page is designed for effortless navigation, allowing you to discover fashion that speaks to your individual style. From chic streetwear to elegant evening attire, each category is a gateway to a world of possibilities. Enjoy a seamless shopping experience, secure transactions, and stay ahead of the fashion curve. Thank you for choosing Cinnamon19Fashion, where the Shop page is your portal to a wardrobe that reflects your unique personality. Happy browsing!",
    url: "https://cinnamon19fashion.com/en/shop",
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
      canonical: "https://cinnamon19fashion.com/en/shop",
    },
  },
};

export default function Page() {
  return <ShopPageDetails />;
}
