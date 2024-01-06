import LoginComponent from "../components/Login/PageDetails";

export const metadata = {
  title: "Login | Cinnamon19Fashion",
  description:
    "Welcome to the secure login page of Cinnamon19Fashion. Your style journey continues here. Log in to your account and unlock a personalized shopping experience tailored just for you. Rest assured, your privacy and data security are our top priorities. Forgot your password? No worries – easily recover it and get back to exploring the latest fashion trends. Your account is the gateway to seamless shopping, order tracking, and exclusive perks. Thank you for being part of Cinnamon19Fashion, where every login brings you closer to curated style and convenience. Happy shopping!",
  openGraph: {
    title: "Login | Cinnamon19Fashion",
    description:
      "Welcome to the secure login page of Cinnamon19Fashion. Your style journey continues here. Log in to your account and unlock a personalized shopping experience tailored just for you. Rest assured, your privacy and data security are our top priorities. Forgot your password? No worries – easily recover it and get back to exploring the latest fashion trends. Your account is the gateway to seamless shopping, order tracking, and exclusive perks. Thank you for being part of Cinnamon19Fashion, where every login brings you closer to curated style and convenience. Happy shopping!",
    url: "https://cinnamon19fashion.com/en/login",
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
      canonical: "https://cinnamon19fashion.com/en/login",
    },
  },
};

export default function Page() {
  return <LoginComponent />;
}
