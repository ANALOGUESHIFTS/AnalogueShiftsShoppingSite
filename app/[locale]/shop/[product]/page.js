import ProductPageDetails from "../../components/Shop/ProductPageDetails";

export const metadata = {
  title: "Shop | Cinnamon19Fashion",
  description: "Explore amazing fashion outfit.",
};

export default function Page({ params }) {
  return <ProductPageDetails id={params.product} />;
}
