import BlogPageDetails from "../components/Blog/PageDetails";

export const metadata = {
  title: "Blog | Cinnamon19Fashion",
  description:
    "Welcome to the Cinnamon19Fashion blog, where fashion meets inspiration! Dive into a world of style tips, trend reports, and behind-the-scenes glimpses. Our blog is your go-to source for the latest in fashion, lifestyle, and all things fabulous. Join us on this style journey, and stay tuned for insightful articles that elevate your fashion game. Discover more than just outfits; explore a community that celebrates individuality and embraces the ever-evolving world of fashion. Get ready to be inspired, informed, and immersed in the chic universe of Cinnamon19Fashion.",
  openGraph: {
    title: "Blog | Cinnamon19Fashion",
    description:
      "Welcome to the Cinnamon19Fashion blog, where fashion meets inspiration! Dive into a world of style tips, trend reports, and behind-the-scenes glimpses. Our blog is your go-to source for the latest in fashion, lifestyle, and all things fabulous. Join us on this style journey, and stay tuned for insightful articles that elevate your fashion game. Discover more than just outfits; explore a community that celebrates individuality and embraces the ever-evolving world of fashion. Get ready to be inspired, informed, and immersed in the chic universe of Cinnamon19Fashion.",
    url: "https://cinnamon19fashion.com/en/blog",
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
      canonical: "https://cinnamon19fashion.com/en/blog",
    },
  },
};

export default function Page() {
  return <BlogPageDetails />;
}
