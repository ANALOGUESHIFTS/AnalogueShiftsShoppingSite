import CheckOutPageDetails from "../components/Checkout/PageDetails";

export const metadata = {
  title: "Checkout | Cinnamon19Fashion",
  description:
    "Welcome to the streamlined checkout experience at Cinnamon19Fashion. Your fashion journey is just a few clicks away from becoming a reality. Our checkout page is designed with simplicity and security in mind, ensuring a hassle-free and trustworthy transaction. Confirm your stylish selections with confidence, knowing that your information is handled with the utmost care. Complete your order swiftly and seamlessly, and get ready to unwrap the fashion delights that await you. Thank you for choosing Cinnamon19Fashion—where convenience meets couture at the click of a button!",
  openGraph: {
    title: "Checkout | Cinnamon19Fashion",
    description:
      "Welcome to the streamlined checkout experience at Cinnamon19Fashion. Your fashion journey is just a few clicks away from becoming a reality. Our checkout page is designed with simplicity and security in mind, ensuring a hassle-free and trustworthy transaction. Confirm your stylish selections with confidence, knowing that your information is handled with the utmost care. Complete your order swiftly and seamlessly, and get ready to unwrap the fashion delights that await you. Thank you for choosing Cinnamon19Fashion—where convenience meets couture at the click of a button!",
    url: "https://cinnamon19fashion.com/en/checkout",
    siteName: "Cinnamon19Fashion",
    images: ["https://cinnamon19fashion.com/images/ceo.jpg"],
    locale: "en_US",
    type: "website",
    alternates: {
      canonical: "https://cinnamon19fashion.com/en/checkout",
    },
  },
};

export default function Page() {
  return <CheckOutPageDetails />;
}
