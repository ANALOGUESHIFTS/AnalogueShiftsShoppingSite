import ProfilePageDetails from "../components/Profile/ProfilePageDetails";

export const metadata = {
  title: "Profile | Cinnamon19Fashion",
  description:
    "Welcome to your Profile Page at Cinnamon19Fashion, the personalized hub for your style preferences and account management. Here, you have the power to tailor your fashion journey. Update your profile information, manage your orders, and save your favorite items for later. Your Profile Page is the gateway to a curated shopping experience designed just for you. Stay connected with your order history, track shipments, and discover exclusive offers tailored to your taste. Thank you for entrusting Cinnamon19Fashion with your style, where your profile is the key to a seamless and customized shopping adventure. Enjoy the journey!",
  openGraph: {
    title: "Profile | Cinnamon19Fashion",
    description:
      "Welcome to your Profile Page at Cinnamon19Fashion, the personalized hub for your style preferences and account management. Here, you have the power to tailor your fashion journey. Update your profile information, manage your orders, and save your favorite items for later. Your Profile Page is the gateway to a curated shopping experience designed just for you. Stay connected with your order history, track shipments, and discover exclusive offers tailored to your taste. Thank you for entrusting Cinnamon19Fashion with your style, where your profile is the key to a seamless and customized shopping adventure. Enjoy the journey!",
    url: "https://cinnamon19fashion.com/en/profile",
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
      canonical: "https://cinnamon19fashion.com/en/profile",
    },
  },
};

export default function Page() {
  return <ProfilePageDetails />;
}
