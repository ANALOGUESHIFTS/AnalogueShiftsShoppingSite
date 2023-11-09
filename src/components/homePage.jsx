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
import BespokeSection from "./bespokeSection";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");
  const [loading, setLoading] = useState(false);
  const [sessionLocked, setSessionLocked] = useState([{ isLocked: false }]);
  const bespokeCollectionRef = collection(db, "bespokeSession");

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
    setLoading(true);
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
      setLoading(false);
      setInitialProducts(filteredData);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Products");
    }
  };

  const getlocked = async () => {
    try {
      const data = await getDocs(bespokeCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setSessionLocked(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error");
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
      getlocked();
    }, 4000);
  }, [pictures, initialProducts]);

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
      <BespokeSection isLocked={sessionLocked[0]?.isLocked} />
    </main>
  );
}
