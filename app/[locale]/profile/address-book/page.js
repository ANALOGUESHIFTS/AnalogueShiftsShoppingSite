import AddressBookPageDetails from "../../components/Profile/AddressBookPageDetails";

export const metadata = {
  title: "AddressBook | Cinnamon19Fashion",
  description:
    "Welcome to the Address Book page at Cinnamon19Fashion, your personalized address management center. Here, you can effortlessly organize and update your shipping information for a seamless shopping experience. Add, edit, or delete addresses with ease, ensuring your orders reach you wherever you are. Your Address Book is the key to convenience, making checkout faster and hassle-free. Keep your shipping details up-to-date and let Cinnamon19Fashion handle the rest. Thank you for choosing us for your fashion needs, where the Address Book is your tool for efficient and tailored deliveries. Happy shopping!",
  openGraph: {
    title: "AddressBook | Cinnamon19Fashion",
    description:
      "Welcome to the Address Book page at Cinnamon19Fashion, your personalized address management center. Here, you can effortlessly organize and update your shipping information for a seamless shopping experience. Add, edit, or delete addresses with ease, ensuring your orders reach you wherever you are. Your Address Book is the key to convenience, making checkout faster and hassle-free. Keep your shipping details up-to-date and let Cinnamon19Fashion handle the rest. Thank you for choosing us for your fashion needs, where the Address Book is your tool for efficient and tailored deliveries. Happy shopping!",
    url: "https://cinnamon19fashion.com/en/profile/address-book",
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
      canonical: "https://cinnamon19fashion.com/en/profile/address-book",
    },
  },
};

export default function Page() {
  return <AddressBookPageDetails />;
}
