import ContactPageDetails from "../components/Contact/PageDetails";

export const metadata = {
  title: "Contact | Cinnamon19Fashion",
  description:
    "Connect with us effortlessly through our dedicated contact page at Cinnamon19Fashion. Whether you have a question, suggestion, or just want to say hello, we're here for you. Our customer support team is ready to assist, ensuring a prompt and personalized response to your inquiries. Feel free to reach out through our contact form or find our contact details below. We value your feedback and are committed to making your experience with Cinnamon19Fashion exceptional. Let's stay in touch and make your fashion journey even more enjoyable!",
  openGraph: {
    title: "Contact | Cinnamon19Fashion",
    description:
      "Connect with us effortlessly through our dedicated contact page at Cinnamon19Fashion. Whether you have a question, suggestion, or just want to say hello, we're here for you. Our customer support team is ready to assist, ensuring a prompt and personalized response to your inquiries. Feel free to reach out through our contact form or find our contact details below. We value your feedback and are committed to making your experience with Cinnamon19Fashion exceptional. Let's stay in touch and make your fashion journey even more enjoyable!",
    url: "https://cinnamon19fashion.com/en/contact",
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
      canonical: "https://cinnamon19fashion.com/en/contact",
    },
  },
};

export default function Page() {
  return <ContactPageDetails />;
}
