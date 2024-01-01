import { doc, getDoc } from "firebase/firestore";
import ProductPageDetails from "../../components/Shop/ProductPageDetails";
import { db } from "../../config/firebase";

export async function generateMetadata({ params }) {
  // read route params
  const slug = params.product;
  const productsCollectionRef = doc(db, "products", slug);
  let product = {};

  try {
    const data = await getDoc(productsCollectionRef);
    let filteredData = { ...data.data(), id: data.id };
    product = filteredData;
  } catch (err) {
    console.error(err);
  }

  return {
    title: "Cinnamon19Fashion | " + product.name,
    description:
      "Welcome to the Shop page at Cinnamon19Fashion, the heart of your fashion exploration. Immerse yourself in a curated collection of the latest trends, timeless classics, and must-have pieces. Our Shop page is designed for effortless navigation, allowing you to discover fashion that speaks to your individual style. From chic streetwear to elegant evening attire, each category is a gateway to a world of possibilities. Enjoy a seamless shopping experience, secure transactions, and stay ahead of the fashion curve. Thank you for choosing Cinnamon19Fashion, where the Shop page is your portal to a wardrobe that reflects your unique personality. Happy browsing!",
    openGraph: {
      title: "Cinnamon19Fashion | " + product.name,
      description:
        "Welcome to the Shop page at Cinnamon19Fashion, the heart of your fashion exploration. Immerse yourself in a curated collection of the latest trends, timeless classics, and must-have pieces. Our Shop page is designed for effortless navigation, allowing you to discover fashion that speaks to your individual style. From chic streetwear to elegant evening attire, each category is a gateway to a world of possibilities. Enjoy a seamless shopping experience, secure transactions, and stay ahead of the fashion curve. Thank you for choosing Cinnamon19Fashion, where the Shop page is your portal to a wardrobe that reflects your unique personality. Happy browsing!",
      url: `https://cinnamon19fashion.com/en/shop/${product.id}`,
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
        canonical: `https://cinnamon19fashion.com/en/shop/${product.id}`,
      },
    },
  };
}

export default function Page({ params }) {
  return <ProductPageDetails id={params.product} />;
}
