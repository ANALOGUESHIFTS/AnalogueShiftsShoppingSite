import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import LoadingTwo from "./loadingTwo";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";
import { getDoc, collection, doc, addDoc, getDocs } from "firebase/firestore";
import { v4 } from "uuid";

import CustomSlide from "./slide";

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

  //Related Products
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedPictures, setRelatedPictures] = useState([]);
  const [relatedInitialProducts, setRelatedInitialProducts] = useState([]);

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
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Related Products");
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
      }, 2000);
      setTimeout(() => {
        setLoading(true);
      }, 4000);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [relatedPictures]);

  return (
    <>
      {loading && <LoadingTwo />}
      <main
        ref={containerRef}
        className="p-20 max-[1000px]:px-12 max-[800px]:p-5"
      >
        <div className="w-full flex gap-10 flex-wrap">
          {item && <CustomSlide arr={item.productPictures} />}
          <div className="w-[500px] pt-3 flex flex-col max-[500px]:w-[90%]">
            <p className="text-PrimaryBlack text-2xl font-bold">
              {item && item.name}
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
            <p className="text-PrimaryBlack/80 font-semibold text-sm pt-3">
              {item && item.description}
            </p>
            <div className="pt-4">
              <p className="text-PrimaryBlack text-xl font-bold pb-2">
                Why buy {item && item.name}?
              </p>
              <p className="text-PrimaryBlack/80 font-semibold text-sm pt-3">
                {item && item.whyUserShouldPurchase}
              </p>
            </div>
            <div className="pt-4">
              <p className="text-PrimaryBlack text-xl font-bold pb-2">
                Benifits
              </p>
              <ul className="w-full pl-2.5 flex flex-col gap-2">
                {item &&
                  item.benefits.map((b) => {
                    return (
                      <li className="text-PrimaryBlack/80 font-semibold text-sm pt-3 list-disc ml-3">
                        {b}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="pt-4">
              <p className="text-PrimaryBlack text-xl font-bold pb-2">
                Features
              </p>
              <ul className="w-full pl-2.5 flex flex-col gap-2">
                {item &&
                  item.features.map((b) => {
                    return (
                      <li className="text-PrimaryBlack/80 font-semibold text-sm pt-3 list-disc ml-3">
                        {b}
                      </li>
                    );
                  })}
              </ul>
            </div>

            <p className="text-PrimaryBlack/80 pt-4 font-semibold text-sm pb-3">
              {t("Available Quantity")}: {item && item.availableQuantity}
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
                onClick={() => setQuantity((prev) => Math.max((prev -= 1), 1))}
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
                  alert(
                    "Product Quantity is not enough, please reduce the quantity"
                  );
                }
              }}
              disabled={quantity < 1}
              className="border-none bg-PrimaryOrange flex items-center justify-center text-base font-bold text-white px-8 py-2 duration-300 hover:bg-PrimaryOrange/80"
            >
              {t("ADD TO CART")}
            </button>
          </div>
        </div>
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
                  to={`/product-details/${data.id}`}
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
