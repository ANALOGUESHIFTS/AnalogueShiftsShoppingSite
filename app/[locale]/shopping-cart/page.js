import ShoppingCartPageDetails from "../components/ShoppingCart/PageDetails";

export const metadata = {
  title: "Shopping Cart | Cinnamon19Fashion",
  description:
    "Welcome to your Shopping Cart at Cinnamon19Fashion, where your fashion dreams take shape. As you browse through our curated collection, your selections find a home here – a virtual cart filled with style potential. Easily review your chosen items, adjust quantities, and explore exclusive promotions. The Shopping Cart is your staging area for the perfect fashion ensemble. Ready to proceed to checkout? Your stylish journey is just a click away. Thank you for shopping with Cinnamon19Fashion, where the Shopping Cart is your ticket to a world of curated elegance. Happy styling!",
  openGraph: {
    title: "Shopping Cart | Cinnamon19Fashion",
    description:
      "Welcome to your Shopping Cart at Cinnamon19Fashion, where your fashion dreams take shape. As you browse through our curated collection, your selections find a home here – a virtual cart filled with style potential. Easily review your chosen items, adjust quantities, and explore exclusive promotions. The Shopping Cart is your staging area for the perfect fashion ensemble. Ready to proceed to checkout? Your stylish journey is just a click away. Thank you for shopping with Cinnamon19Fashion, where the Shopping Cart is your ticket to a world of curated elegance. Happy styling!",
    url: "https://cinnamon19fashion.com/en/shopping-cart",
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
      canonical: "https://cinnamon19fashion.com/en/shopping-cart",
    },
  },
};

export default function Page() {
  return <ShoppingCartPageDetails />;
}
