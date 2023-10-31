import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import LoadingTwo from "./loadingTwo";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";
import { getDoc, collection, doc, addDoc } from "firebase/firestore";
import { v4 } from "uuid";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function ProductDetails() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [pictures, setPictures] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const productsCollectionRef = doc(db, "products", id);
  const [loading, setLoading] = useState();
  const [item, setItem] = useState(null);
  const containerRef = useRef();
  const { t, i18n } = useTranslation();
  const cartCollectionRef = collection(db, "cartDatas");
  const [user, setUser] = useState(null);

  const getImage = async (folder) => {
    try {
      listAll(ref(storage, `${folder}/`)).then((res) =>
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setPictures((prev) => [...prev, url]);
          });
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const data = await getDoc(productsCollectionRef);
      await getImage(data.data().productImagesFolder);

      let filteredData = { ...data.data(), id: data.id };

      setInitialProducts(filteredData);
      setLoading(false);
      setItem(null);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Products");
    }
  };

  const addToCart = async (data) => {
    setLoading(true);
    try {
      await addDoc(cartCollectionRef, data);
      alert("Item Added To Cart");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Adding Item to Cart");
    }
  };

  useEffect(() => {
    if (pictures.length > 0) {
      setLoading(true);
      let dummyProducts = initialProducts;
      dummyProducts.productPictures = pictures;
      setTimeout(() => {
        setItem(dummyProducts);
      }, 1000);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [pictures]);

  useEffect(() => {
    setLoading(true);
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      getProducts();
    }
  }, [user]);

  return (
    <>
      {loading && <LoadingTwo />}
      <main
        ref={containerRef}
        className="p-28 max-[1000px]:px-12 max-[800px]:p-5"
      >
        <div className="w-full flex gap-20 flex-wrap">
          <Splide
            aria-label="Product Images"
            className="w-[250px] max-[500px]:w-[90%]"
          >
            {item &&
              item.productPictures.map((picture) => (
                <SplideSlide key={v4()}>
                  <img
                    src={picture}
                    alt="Image 2"
                    className=" h-80 object-cover"
                  />
                </SplideSlide>
              ))}
          </Splide>
          <div className="w-[400px] flex flex-col max-[500px]:w-[90%]">
            <p className="text-PrimaryBlack text-2xl font-bold">
              {item && item.name}
            </p>
            <p className="text-PrimaryBlack/80 font-semibold text-sm pt-3">
              {item && item.description}
            </p>
            <p className="text-xl text-PrimaryOrange font-bold flex items-center pt-3">
              ${item && item.priceAfter}&nbsp;
              {item && item.priceBefore && (
                <p
                  className="text-xl text-PrimaryBlack/80 font-normal relative"
                  id="priceBefore"
                >
                  ${item && item.priceBefore}
                </p>
              )}
            </p>
            <div className="pt-3">
              <p className="text-PrimaryBlack/80 font-semibold text-sm pt-1 pb-3">
                {t("Color")}: {selectedColor}
              </p>
              <div className="flex w-full flex-wrap gap-1.5">
                {item &&
                  item.colors.map((color) => {
                    return (
                      <div
                        key={v4()}
                        onClick={() => setSelectedColor(color)}
                        className="w-6 h-6 flex justify-center items-center rounded-[50%] hover:border hover:border-solid hover:border-black/70 cursor-pointer"
                      >
                        <div
                          style={{ backgroundColor: `${color}` }}
                          className="w-5 h-5 rounded-[50%]"
                        ></div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="pt-3">
              <p className="text-PrimaryBlack/80 font-semibold text-sm pt-1 pb-3">
                {t("Size")}: {selectedSize}
              </p>
              <div className="flex w-full flex-wrap gap-1.5">
                {item?.sizes &&
                  item.sizes.map((size) => {
                    return (
                      <div
                        key={v4()}
                        onClick={() => setSelectedSize(size)}
                        className="w-14 h-9 rounded flex justify-center items-center border border-solid border-black/20 cursor-pointer"
                      >
                        <p className="text-lg font-bold text-PrimaryBlack">
                          {size}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className=" flex flex-col w-auto items-center">
            <p className="pb-3 text-PrimaryBlack text-base font-semibold">
              {t("Quantity")}
            </p>
            <div className="flex w-auto pb-4">
              <button
                onClick={() => setQuantity((prev) => Math.max((prev -= 1), 0))}
                className="border-none bg-transparent text-PrimaryBlack/40 font-bold text-2xl flex px-5 h-full items-center max-[900px]:text-xl"
              >
                -
              </button>
              <p className="px-5 h-full flex items-center text-PrimaryBlack/70 font-semibold max-[900px]:text-sm r">
                {quantity}
              </p>
              <button
                onClick={() => setQuantity((prev) => (prev += 1))}
                className="border-none bg-transparent text-PrimaryBlack/40 flex font-bold text-2xl px-5 h-full items-center max-[900px]:text-xl"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addToCart({
                  email: user.email,
                  quantity: quantity,
                  size: selectedSize,
                  color: selectedColor,
                  productName: item.name,
                  imagesFolder: item.productImagesFolder,
                  price: item.priceAfter,
                });
              }}
              disabled={quantity < 1}
              className="border-none bg-PrimaryOrange flex items-center justify-center text-base font-bold text-white px-8 py-2 duration-300 hover:bg-PrimaryOrange/80"
            >
              {t("ADD TO CART")}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
