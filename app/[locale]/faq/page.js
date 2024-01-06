import FaqPageDetails from "../components/Faq/PageDetails";

export const metadata = {
  title: "FAQs | Cinnamon19Fashion",
  description:
    "Welcome to the FAQ page at Cinnamon19Fashion, your go-to resource for quick answers and helpful insights. We understand you may have questions, and we're here to provide clarity. Explore our frequently asked questions to find information on orders, shipping, returns, and more. If you don't find what you're looking for, feel free to contact our customer support team for personalized assistance. We're dedicated to making your experience with Cinnamon19Fashion as smooth as possible. Discover the answers you need and embark on your fashion journey with confidence.",
  openGraph: {
    title: "FAQs | Cinnamon19Fashion",
    description:
      "Welcome to the FAQ page at Cinnamon19Fashion, your go-to resource for quick answers and helpful insights. We understand you may have questions, and we're here to provide clarity. Explore our frequently asked questions to find information on orders, shipping, returns, and more. If you don't find what you're looking for, feel free to contact our customer support team for personalized assistance. We're dedicated to making your experience with Cinnamon19Fashion as smooth as possible. Discover the answers you need and embark on your fashion journey with confidence.",
    url: "https://cinnamon19fashion.com/en/faq",
    siteName: "Cinnamon19Fashion",
    image: {
      url: "images/ceo.jpg",
      width: 600,
      height: 800,
    },
    locale: "en_US",
    type: "website",
    alternates: {
      canonical: "https://cinnamon19fashion.com/en/faq",
    },
  },
};

export default function Page() {
  return <FaqPageDetails />;
}
