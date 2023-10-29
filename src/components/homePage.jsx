import { useState, useEffect } from "react";

import BlogSection from "./blogSection";
import DealOfTheWeek from "./dealOfTheWeek";
import HomeSectionOne from "./homeSectionOne";
import HomeSectionTwo from "./homeSectionTwo";
import InstaFashion from "./instaFashion";
import MensCollection from "./mensCollection";

import LoadingTwo from "./loadingTwo";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");
  const [loading, setLoading] = useState(false);

  const getImage = async (folder) => {
    let images = [];
    try {
      listAll(ref(storage, `${folder}/`)).then((res) =>
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => images.push(url));
        })
      );

      setPictures((prev) => [
        ...prev,
        {
          folder: folder,
          images: images,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const data = await getDocs(productsCollectionRef);
      for (let folder of data.docs) {
        await getImage(folder.data().productImagesFolder);
      }

      let filteredData = data.docs.map((x) => {
        return {
          ...x.data(),
          id: x.id,
        };
      });

      setInitialProducts(filteredData);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Products");
    }
  };

  useEffect(() => {
    let dummyProducts = initialProducts;
    dummyProducts.forEach((data) => {
      data.productPictures = pictures.filter(
        (x) => x.folder === data.productImagesFolder
      )[0].images;
    });
    setTimeout(() => {
      setProducts(dummyProducts);
    }, 1000);
    setTimeout(() => {
      setLoading(true);
    }, 4000);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [pictures]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="w-full">
      {loading && <LoadingTwo />}
      <HomeSectionOne />
      <HomeSectionTwo products={products} />
      <DealOfTheWeek />
      <MensCollection products={products} />
      <InstaFashion />
      <BlogSection />
    </main>
  );
}
