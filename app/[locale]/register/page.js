import RegisterComponent from "../components/Register/PageDetails";

export const metadata = {
  title: "Register | Cinnamon19Fashion",
  description:
    "Welcome to the Register page at Cinnamon19Fashion, your gateway to a world of personalized fashion and exclusive benefits. Creating an account is quick and easy – join our fashion community today! Unlock a tailored shopping experience, save your favorite items, and breeze through the checkout process seamlessly. As a registered member, you gain access to exclusive promotions, early access to sales, and personalized recommendations based on your style preferences. Thank you for choosing Cinnamon19Fashion. Register now and embark on a stylish journey with us!",
  openGraph: {
    title: "Register | Cinnamon19Fashion",
    description:
      "Welcome to the Register page at Cinnamon19Fashion, your gateway to a world of personalized fashion and exclusive benefits. Creating an account is quick and easy – join our fashion community today! Unlock a tailored shopping experience, save your favorite items, and breeze through the checkout process seamlessly. As a registered member, you gain access to exclusive promotions, early access to sales, and personalized recommendations based on your style preferences. Thank you for choosing Cinnamon19Fashion. Register now and embark on a stylish journey with us!",
    url: "https://cinnamon19fashion.com/en/register",
    siteName: "Cinnamon19Fashion",
    images: [
      {
        url: "images/ceo.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
    alternates: {
      canonical: "https://cinnamon19fashion.com/en/register",
    },
  },
};

export default function Page() {
  return <RegisterComponent />;
}
