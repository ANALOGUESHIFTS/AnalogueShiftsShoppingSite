import HomePageDetails from "./components/Home/PageDetails";

export const metadata = {
  title: "Cinnamon19Fashion",
  description:
    "Welcome to Cinnamon19Fashion, where style meets convenience. Discover the latest trends in apparel, from chic streetwear to elegant evening dresses. Browse a curated collection of high-quality fashion wear, ensuring you're always on point with your style game. Elevate your wardrobe with our diverse range of clothing.",
  openGraph: {
    title: "Cinnamon19Fashion",
    description:
      "Welcome to Cinnamon19Fashion, where style meets convenience. Discover the latest trends in apparel, from chic streetwear to elegant evening dresses. Browse a curated collection of high-quality fashion wear, ensuring you're always on point with your style game. Elevate your wardrobe with our diverse range of clothing.",
    url: "https://cinnamon19fashion.com/en",
    siteName: "Cinnamon19Fashion",
    images: [
      {
        url: "https://cinnamon19fashion.com/images/ceo.jpg",
        width: 800,
        height: 600,
        alt: "Cinnamon19Fashion Image",
      },
    ],
    locale: "en_US",
    type: "website",
    alternates: {
      canonical: "https://cinnamon19fashion.com/en",
    },
  },
};

export default function Page() {
  return <HomePageDetails />;
}
