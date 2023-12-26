"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LoadingTwo from "../loadingTwo";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth, storage } from "../../config/firebase";
import { v4 } from "uuid";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import {
  getDocs,
  collection,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function ShoppingCartPageDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const [cartProducts, setCartProducts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const t = useTranslations("Index");
  const cartCollectionRef = collection(db, "cartDatas");
  const [pictures, setPictures] = useState([]);

  const getImage = async (folder) => {
    let images = [];
    try {
      listAll(ref(storage, `${folder}/`)).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => images.push(url));
        });
      });

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

  const updateCart = async (id, data) => {
    setLoading(true);
    const addressDoc = doc(db, "cartDatas", id);
    try {
      await updateDoc(addressDoc, data);
      getData();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Updating Cart");
    }
  };

  const itemAvailable = async (id, quantity, dataId) => {
    const productsCollectionRef = doc(db, "products", id);
    try {
      const data = await getDoc(productsCollectionRef);
      if (Number(data.data().availableQuantity) <= quantity) {
        await removeItem(dataId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const data = await getDocs(cartCollectionRef);
      let userData = data.docs.filter((data) => {
        return data.data().email === user.email;
      });
      for (let folder of userData) {
        await getImage(folder.data().imagesFolder);
      }
      const filteredData = userData.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setData(filteredData);
      if (!filteredData.length) {
        setCartProducts([]);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Data");
    }
  };

  const removeItem = async (id) => {
    setLoading(true);
    const itemDoc = doc(db, "cartDatas", id);
    try {
      await deleteDoc(itemDoc);
      await getData();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Removing Item");
    }
  };

  useEffect(() => {
    if (pictures.length > 0) {
      let dummyProducts = data;
      dummyProducts.forEach((product) => {
        product.productPictures = pictures.filter(
          (x) => x.folder === product.imagesFolder
        )[0].images;
      });
      setTimeout(() => {
        setCartProducts(dummyProducts);
      }, 1000);
    }
  }, [pictures]);

  useEffect(() => {
    if (cartProducts && cartProducts[0]) {
      setLoading(false);
    }
  }, [cartProducts]);

  useEffect(() => {
    setTotal(0);
    if (cartProducts) {
      cartProducts.forEach((data) => {
        setTotal((prev) => (prev += data.price * data.quantity));
        itemAvailable(data.productId, data.quantity, data.id);
      });
    }
  }, [cartProducts]);

  const containerRef = useRef();

  useEffect(() => {
    setLoading(true);
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push(pathname.slice(0, 3).concat("/login"));
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <>
      {loading && <LoadingTwo />}
      <main
        ref={containerRef}
        className="p-28 max-[800px]:px-5 max-[1000px]:px-12 max-[900px]:py-20"
      >
        <div className="w-full overflow-x-auto ">
          <div className="w-full border pb-8 max-[900px]:w-[700px]">
            <div className="w-full border-b grid grid-cols-6 h-14 items-center px-6 mb-6 gap-8">
              <p className="col-span-1 text-center text-PrimaryBlack font-bold text-xs">
                {t("IMAGE")}
              </p>
              <p className="col-span-2 text-PrimaryBlack font-bold text-xs">
                {t("PRODUCT NAME")}
              </p>
              <p className="col-span-1 text-PrimaryBlack font-bold text-xs">
                {t("Price").toUpperCase()}
              </p>
              <p className="col-span-1 text-PrimaryBlack font-bold text-xs">
                {t("Quantity").toUpperCase()}
              </p>
              <p className="col-span-1 text-PrimaryBlack font-bold text-xs">
                {t("Total").toUpperCase()}
              </p>
            </div>

            <div className="w-full flex flex-col gap-6">
              {cartProducts &&
                cartProducts.map((data) => {
                  return (
                    <div
                      key={v4()}
                      className="w-full grid grid-cols-6 items-center px-6 gap-8 h-40 max-[900px]:h-20"
                    >
                      <div
                        style={{
                          backgroundImage: `url(${data.productPictures[0]})`,
                        }}
                        className="h-full col-span-1 bg-cover bg-center"
                      ></div>
                      <p className="col-span-2 text-PrimaryBlack text-[17px]">
                        {data.productName}
                      </p>
                      <p className="col-span-1 text-PrimaryOrange font-bold text-base">
                        ${data.price}
                      </p>
                      <div className="col-span-1">
                        <div className="flex h-9 w-auto border-2 border-solid border-PrimaryBlack/20 max-[900px]:grid max-[900px]:grid-cols-3">
                          <button
                            onClick={() =>
                              updateCart(data.id, {
                                ...data,
                                quantity: Math.max(1, data.quantity - 1),
                              })
                            }
                            className="border-none max-[900px]:col-span-1 bg-transparent text-PrimaryBlack/40 font-bold text-2xl flex px-5 h-full items-center max-[900px]:text-xl max-[900px]:px-0 max-[900px]:justify-center"
                          >
                            -
                          </button>
                          <p className="px-5 h-full max-[900px]:col-span-1 flex items-center text-PrimaryBlack/70 font-semibold max-[900px]:text-sm max-[900px]:px-0 max-[900px]:justify-center">
                            {data.quantity}
                          </p>
                          <button
                            onClick={() =>
                              updateCart(data.id, {
                                ...data,
                                quantity: data.quantity + 1,
                              })
                            }
                            className="border-none bg-transparent max-[900px]:col-span-1 text-PrimaryBlack/40 flex font-bold text-2xl px-5 h-full items-center max-[900px]:text-xl max-[900px]:px-0 max-[900px]:justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-between items-center">
                        <p className="col-span-2 text-PrimaryOrange font-bold text-base">
                          ${data.price * data.quantity}
                        </p>
                        <button
                          onClick={() => removeItem(data.id)}
                          className="border-none bg-transparent text-PrimaryBlack/90 text-lg font-thin"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="w-full mt-7 flex justify-between max-[900px]:flex-col">
          <div className="w-[330px] flex flex-col max-[900px]:w-full">
            <div className="flex justify-between w-full">
              <Link
                href={pathname.slice(0, 3).concat("/shop")}
                className="w-full h-12 flex justify-center items-center border-2 border-solid border-black/10 text-sm text-PrimaryBlack/30 font-bold"
              >
                {t("CONTINUE SHOPPING")}
              </Link>
            </div>
            <p className="pt-8 font-bold text-PrimaryBlack text-base pb-3">
              {t("DISCOUNT CODES")}
            </p>
            <div className="w-full h-12 border flex">
              <input
                type="text"
                className="w-[80%] outline-none pl-5"
                placeholder="Enter your codes"
              />
              <button className="w-[20%] h-12 flex justify-center items-center text-sm text-PrimaryBlack font-bold border-none">
                {t("Apply").toUpperCase()}
              </button>
            </div>
          </div>
          <div className="w-[330px] max-[900px]:w-full bg-black/10  grid grid-rows-3">
            <div className="row-span-1 border-x-2 border-t-2 border-solid border-black/10 w-full px-5 pt-3">
              <div className="w-full h-full flex justify-between border-b border-solid border-white">
                <p className="text-PrimaryBlack text-base font-medium">
                  {t("Subtotal")}
                </p>
                <p className="text-base font-bold text-PrimaryBlack">
                  ${total}
                </p>
              </div>
            </div>
            <div className="row-span-1 w-full border-x-2 border-solid border-black/10 px-5 pt-3">
              <div className="w-full h-full flex justify-between border-b border-solid">
                <p className="text-base font-bold text-PrimaryBlack">
                  {t("Total").toUpperCase()}
                </p>
                <p className="text-base font-bold text-PrimaryOrange">
                  ${total}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                router.push(pathname.slice(0, 3).concat("/checkout"))
              }
              disabled={total <= 0 ? true : false}
              className={`row-span-1 w-full flex justify-center items-center ${
                total <= 0 ? "bg-PrimaryBlack/50" : "bg-PrimaryBlack"
              } text-base font-bold text-white`}
            >
              {t("PROCEED TO CHECK OUT")}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
