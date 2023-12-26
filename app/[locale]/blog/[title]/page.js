import ViewBlog from "../../components/Blog/ViewBlog";
import { blogs } from "../../components/Blog/data";

export async function generateMetadata({ params }) {
  // read route params
  const slug = params.title;
  const data = blogs.filter((v) => v.id === slug)[0];

  return {
    title: "Cinnamon19Fashion | " + data.title,
    description: "Explore Lists of Helpful Articles on cinnamon.",
  };
}

export default function Page({ params }) {
  return <ViewBlog id={params.title} />;
}
