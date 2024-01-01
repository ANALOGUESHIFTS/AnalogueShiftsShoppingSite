import ViewBlog from "../../components/Blog/ViewBlog";
import { blogs } from "../../components/Blog/data";

export async function generateMetadata({ params }) {
  // read route params
  const slug = params.title;
  const data = blogs.filter((v) => v.id === slug)[0];

  return {
    title: "Cinnamon19Fashion | " + data.title,
    description:
      "Welcome to the Cinnamon19Fashion blog, where fashion meets inspiration! Dive into a world of style tips, trend reports, and behind-the-scenes glimpses. Our blog is your go-to source for the latest in fashion, lifestyle, and all things fabulous. Join us on this style journey, and stay tuned for insightful articles that elevate your fashion game. Discover more than just outfits; explore a community that celebrates individuality and embraces the ever-evolving world of fashion. Get ready to be inspired, informed, and immersed in the chic universe of Cinnamon19Fashion.",
    openGraph: {
      title: "Cinnamon19Fashion | " + data.title,
      description:
        "Welcome to the Cinnamon19Fashion blog, where fashion meets inspiration! Dive into a world of style tips, trend reports, and behind-the-scenes glimpses. Our blog is your go-to source for the latest in fashion, lifestyle, and all things fabulous. Join us on this style journey, and stay tuned for insightful articles that elevate your fashion game. Discover more than just outfits; explore a community that celebrates individuality and embraces the ever-evolving world of fashion. Get ready to be inspired, informed, and immersed in the chic universe of Cinnamon19Fashion.",
      url: `https://cinnamon19fashion.com/en/blog/${data.id}`,
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
        canonical: `https://cinnamon19fashion.com/en/blog/${data.id}`,
      },
    },
  };
}

export default function Page({ params }) {
  return <ViewBlog id={params.title} />;
}
