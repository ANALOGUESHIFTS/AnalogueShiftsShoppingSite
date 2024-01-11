"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import LoadingTwo from "../loadingTwo";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth, storage } from "../../config/firebase";
import {
  getDoc,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";
import CustomSlide from "./slide";
import { toast } from "react-toastify";

export default function ProductPageDetails({ id }) {
  const [isExistingInCart, setIsExistingInCart] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const productsCollectionRef = doc(db, "products", id);
  const [loading, setLoading] = useState();
  const [item, setItem] = useState(null);
  const [cartData, setCartData] = useState(null);
  const containerRef = useRef();
  const t = useTranslations("Index");
  const cartCollectionRef = collection(db, "cartDatas");
  const [user, setUser] = useState(null);

  //Related Products
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedPictures, setRelatedPictures] = useState([]);
  const [relatedInitialProducts, setRelatedInitialProducts] = useState([]);

  const getCartData = async (email) => {
    try {
      const data = await getDocs(cartCollectionRef);
      let userData = data.docs.filter((data) => {
        return data.data().email === email;
      });
      const filteredData = userData
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .filter((doc) => doc.productId === id);

      if (filteredData[0]) {
        setIsExistingInCart(true);
        setCartData(filteredData[0]);
      }
    } catch (err) {}
  };

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
    try {
      const data = await getDoc(productsCollectionRef);
      await getImage(data.data().productImagesFolder);

      let filteredData = { ...data.data(), id: data.id };

      setInitialProducts(filteredData);
      setItem(null);
    } catch (err) {
      console.error(err);
      toast.error("Error Fetching Products", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const addToCart = async (data) => {
    setLoading(true);
    try {
      await addDoc(cartCollectionRef, data);
      toast.success("Item Added To Cart", {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Adding Item to Cart", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const getRelatedImage = async (folder) => {
    let images = [];
    try {
      listAll(ref(storage, `${folder}/`)).then((res) =>
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => images.push(url));
        })
      );

      setRelatedPictures((prev) => [
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

  const getRelatedProducts = async () => {
    try {
      const data = await getDocs(collection(db, "products"));

      let filteredData = data.docs.map((x) => {
        return {
          ...x.data(),
          id: x.id,
        };
      });

      setRelatedInitialProducts(
        filteredData.filter((fd) => fd.brand === item.brand)
      );
      for (let folder of data.docs) {
        await getRelatedImage(folder.data().productImagesFolder);
      }
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      await getProducts();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateCart = async (id, data) => {
    setLoading(true);
    const addressDoc = doc(db, "cartDatas", id);
    try {
      await updateDoc(addressDoc, data);
      await getCartData(user.email);
      setLoading(false);
      toast.success("Cart Updated Successfuly", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setLoading(false);
      toast.error("Error Updating Cart", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (pictures.length > 0) {
      let dummyProducts = initialProducts;
      dummyProducts.productPictures = pictures;
      setTimeout(() => {
        setItem(dummyProducts);
      }, 1000);
    }
  }, [pictures]);

  useEffect(() => {
    setLoading(true);
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getCartData(user.email);
      }
    });
    fetchProducts();
  }, []);

  useEffect(() => {
    if (item) {
      getRelatedProducts();
    }
  }, [item]);

  useEffect(() => {
    if (relatedInitialProducts.length) {
      let dummyProducts = relatedInitialProducts;
      dummyProducts.forEach((data) => {
        data.productPictures = relatedPictures.filter(
          (x) => x.folder === data.productImagesFolder
        )[0].images;
      });
      setTimeout(() => {
        setRelatedProducts(dummyProducts);
        setLoading(false);
      }, 1000);
    }
  }, [relatedPictures]);

  return (
    <>
      {loading && <LoadingTwo />}
      <main
        ref={containerRef}
        className="p-20 max-[1000px]:px-12 max-[800px]:p-3"
      >
        {item && (
          <div className="w-full flex gap-10 flex-wrap">
            <CustomSlide arr={item.productPictures} />
            <div className="w-[500px] pt-3 flex flex-col max-[500px]:w-[90%]">
              <p className="text-PrimaryBlack text-2xl font-bold">
                {item.name}
              </p>
              <p className="text-xl text-PrimaryOrange font-bold flex items-center pt-3">
                ${item.priceAfter}&nbsp;
                {item.priceBefore && (
                  <p
                    className="text-xl text-PrimaryBlack/80 font-normal relative"
                    id="priceBefore"
                  >
                    ${item.priceBefore}
                  </p>
                )}
              </p>
              <p className="text-PrimaryBlack/80 font-semibold text-sm pt-3">
                {item.description}
              </p>
              {item.whyUserShouldPurchase && (
                <div className="pt-4">
                  <p className="text-PrimaryBlack text-xl font-bold pb-2">
                    Why buy {item.name}?
                  </p>
                  <p className="text-PrimaryBlack/80 font-semibold text-sm pt-3">
                    {item.whyUserShouldPurchase}
                  </p>
                </div>
              )}
              {item.benefits[0] && (
                <div className="pt-4">
                  <p className="text-PrimaryBlack text-xl font-bold pb-2">
                    Benifits
                  </p>
                  <ul className="w-full pl-2.5 flex flex-col gap-2">
                    {item.benefits.map((b) => {
                      return (
                        <li
                          key={b}
                          className="text-PrimaryBlack/80 font-semibold text-sm pt-3 list-disc ml-3"
                        >
                          {b}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {item.features[0] && (
                <div className="pt-4">
                  <p className="text-PrimaryBlack text-xl font-bold pb-2">
                    Features
                  </p>
                  <ul className="w-full pl-2.5 flex flex-col gap-2">
                    {item.features.map((b) => {
                      return (
                        <li
                          key={b}
                          className="text-PrimaryBlack/80 font-semibold text-sm pt-3 list-disc ml-3"
                        >
                          {b}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <p className="text-PrimaryBlack/80 pt-4 font-semibold text-sm pb-3">
                {"Available Quantity"}: {item.availableQuantity}
              </p>

              {item.colors[0] && (
                <div className="pt-3">
                  <p className="text-PrimaryBlack/80 font-semibold text-sm pt-1 pb-3">
                    {t("Color")}: {selectedColor}
                  </p>
                  <div className="flex w-full flex-wrap gap-1.5">
                    {item.colors &&
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
              )}
              {item.sizes[0] && (
                <div className="pt-3">
                  <p className="text-PrimaryBlack/80 font-semibold text-sm pt-1 pb-3">
                    {t("Size")}: {selectedSize}
                  </p>
                  <div className="flex w-full flex-wrap gap-1.5">
                    {item.sizes &&
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
              )}
            </div>
            <div className=" flex flex-col w-auto items-center">
              <p className="pb-3 text-PrimaryBlack text-base font-semibold">
                {t("Quantity")}
              </p>
              {!isExistingInCart && (
                <div className="flex w-auto pb-4">
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max((prev -= 1), 1))
                    }
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
              )}
              {isExistingInCart && (
                <div className="flex w-auto pb-4">
                  <button
                    onClick={() =>
                      updateCart(cartData.id, {
                        ...cartData,
                        quantity: Math.max(1, cartData.quantity - 1),
                      })
                    }
                    className="border-none bg-transparent text-PrimaryBlack/40 font-bold text-2xl flex px-5 h-full items-center max-[900px]:text-xl"
                  >
                    -
                  </button>
                  <p className="px-5 h-full flex items-center text-PrimaryBlack/70 font-semibold max-[900px]:text-sm r">
                    {cartData.quantity}
                  </p>
                  <button
                    onClick={() => {
                      if (item.availableQuantity >= cartData.quantity + 1) {
                        updateCart(cartData.id, {
                          ...cartData,
                          quantity: cartData.quantity + 1,
                        });
                      } else {
                        toast.error(
                          "Product Quantity is not enough, please reduce the quantity",
                          {
                            position: "top-right",
                            autoClose: 3000,
                          }
                        );
                      }
                    }}
                    className="border-none bg-transparent text-PrimaryBlack/40 flex font-bold text-2xl px-5 h-full items-center max-[900px]:text-xl"
                  >
                    +
                  </button>
                </div>
              )}
              {!isExistingInCart && (
                <button
                  onClick={() => {
                    if (user) {
                      if (item.availableQuantity >= quantity) {
                        addToCart({
                          email: user.email,
                          quantity: quantity,
                          size: selectedSize,
                          color: selectedColor,
                          productName: item.name,
                          imagesFolder: item.productImagesFolder,
                          price: item.priceAfter,
                          productId: id,
                        });
                      } else {
                        toast.error(
                          "Product Quantity is not enough, please reduce the quantity",
                          {
                            position: "top-right",
                            autoClose: 3000,
                          }
                        );
                      }
                    } else {
                      router.push(pathname.slice(0, 3).concat("/login"));
                    }
                  }}
                  disabled={quantity < 1}
                  className="border-none bg-PrimaryOrange flex items-center justify-center text-base font-bold text-white px-8 py-2 duration-300 hover:bg-PrimaryOrange/80"
                >
                  {t("ADD TO CART")}
                </button>
              )}
            </div>
          </div>
        )}
        <div className="pt-6 pb-4 w-full flex justify-center">
          <p className="font-bold text-2xl text-PrimaryBlack">
            You might also like
          </p>
        </div>
        {relatedProducts[0] && (
          <div className="w-full flex flex-wrap gap-x-[2%] gap-y-4">
            {relatedProducts.map((data) => {
              return (
                <Link
                  href={pathname
                    .slice(0, 3)
                    .concat(`/product-details/${data.id}`)}
                  className="w-[31.3%] flex flex-col max-[900px]:w-full "
                  key={v4()}
                >
                  <div
                    style={{
                      backgroundImage: `url(${data.productPictures[0]})`,
                    }}
                    className="productImageBox w-full bg-center h-80 max-[900px]:h-96 bg-cover bg-no-repeat overflow-hidden relative"
                  >
                    <button className="favouriteButton border-none duration-300 -translate-y-14 absolute top-5 right-5 bg-transparent text-PrimaryBlack">
                      <i className="fa-regular fa-heart text-lg"></i>
                    </button>
                    <div className="flex w-[80%] absolute bottom-0 left-[10%] gap-[2%] duration-300 translate-y-20 h-12 menu-row">
                      <button className="h-full w-[20%] bg-PrimaryOrange flex justify-center items-center text-white">
                        <i className="fa-solid fa-bag-shopping"></i>
                      </button>
                      <button className="h-full w-[56%] bg-white flex justify-center items-center text-PrimaryBlack">
                        <i className="fa-solid fa-plus text-xs"></i>&nbsp;
                        <p className="font-bold text-PrimaryBlack text-sm">
                          {t("Quick View")}
                        </p>
                      </button>
                      <button className="h-full w-[20%] bg-white flex justify-center items-center text-PrimaryBlack">
                        <i className="fa-solid fa-shuffle"></i>
                      </button>
                    </div>
                  </div>
                  <div className="w-full py-6 flex flex-col items-center gap-2">
                    <p className="text-xs text-PrimaryBlack/50 font-bold">
                      {data.category}
                    </p>
                    <p className="text-lg text-PrimaryBlack/90 font-bold">
                      {data.name}
                    </p>
                    <p className="text-xl text-PrimaryOrange font-bold flex items-center">
                      ${data.priceAfter}&nbsp;
                      {data.priceBefore && (
                        <p
                          className="text-base text-PrimaryBlack/50 font-normal relative"
                          id="priceBefore"
                        >
                          ${data.priceBefore}
                        </p>
                      )}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
