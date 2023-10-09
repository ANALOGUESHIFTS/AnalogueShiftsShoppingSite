import { Link } from "react-router-dom";

export default function InstaFashion() {
  const instaCollection = [
    {
      collectionId: "insta-collection-01",
      img: "images/insta-1.jpg.webp",
    },
    {
      collectionId: "insta-collection-02",
      img: "images/insta-2.jpg.webp",
    },
    {
      collectionId: "insta-collection-03",
      img: "images/insta-3.jpg.webp",
    },
    {
      collectionId: "insta-collection-04",
      img: "images/insta-4.jpg.webp",
    },
    {
      collectionId: "insta-collection-05",
      img: "images/insta-5.jpg.webp",
    },
    {
      collectionId: "insta-collection-06",
      img: "images/insta-6.jpg.webp",
    },
  ];
  return (
    <div className="w-full grid grid-cols-6 h-80 max-[800px]:flex max-[800px]:flex-wrap max-[800px]:h-auto">
      {instaCollection.map((data) => {
        return (
          <div
            style={{ backgroundImage: `url(${data.img})` }}
            className="col-span-1 h-full bg-cover bg-no-repeat bg-center instaOverlay max-[800px]:h-80 max-[800px]:w-6/12"
            key={data.collectionId}
          >
            <div className="w-full bg-black/30 h-full flex flex-col justify-center items-center opacity-0 duration-300">
              <i class="fa-brands fa-instagram text-white text-4xl"></i>
              <Link to="#" className="pt-3">
                <p className="text-white text-lg">fashion_Collection</p>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
