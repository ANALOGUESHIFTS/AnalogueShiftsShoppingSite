"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { useTranslations } from "next-intl";
import LoadingTwo from "../loadingTwo";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { v4 } from "uuid";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
export default function ShopPageDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [helperProducts, setHelperProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState();
  const pathname = usePathname();
  const t = useTranslations("Index");
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const brandsCollectionRef = collection(db, "brands");
  const categoriesCollectionRef = collection(db, "categories");
  const sizesCollectionRef = collection(db, "sizes");

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
      toast.error("Error Fetching Products", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const containerRef = useRef();

  const getBrands = async () => {
    try {
      const data = await getDocs(brandsCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setBrands(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const getCategories = async () => {
    try {
      const data = await getDocs(categoriesCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setCategories(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const getSizes = async () => {
    try {
      const data = await getDocs(sizesCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setSizes(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const getDatas = async () => {
    setLoading(true);
    try {
      await getProducts();
      await getBrands();
      await getCategories();
      await getSizes();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Error Fetching data, please try again", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleFilter = () => {
    setProducts(
      helperProducts.filter((data) => {
        return (
          data.category === selectedCategory ||
          data.brand === selectedBrand ||
          data.sizes.includes(selectedSize)
        );
      })
    );
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
      setHelperProducts(dummyProducts);
    }, 1000);
  }, [pictures]);

  useEffect(() => {
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
    getDatas();
  }, []);
  return (
    <>
      {loading && <LoadingTwo />}
      <main
        ref={containerRef}
        className="w-full p-28 flex max-[1000px]:px-12 max-[800px]:px-8 max-[900px]:py-20 max-[900px]:flex-col max-[900px]:gap-6"
      >
        <div className="w-[25%] flex flex-col max-[900px]:w-full">
          <div className="flex flex-col pb-8">
            <p className="text-PrimaryBlack text-2xl font-bold pb-5">
              {t("Categories")}
            </p>
            {categories.map((data) => {
              return (
                <div
                  onClick={() => {
                    if (selectedCategory === data.categoryName) {
                      setSelectedCategory("");
                    } else {
                      setSelectedCategory(data.categoryName);
                    }
                  }}
                  style={{
                    borderBottom: `${
                      selectedCategory === data.categoryName
                        ? "1px solid rgba(0,0,0,0.5)"
                        : "none"
                    }`,
                  }}
                  key={v4()}
                  className="text-base cursor-pointer w-fit text-PrimaryBlack/80 py-1"
                >
                  {t(data.categoryName)}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col pb-8">
            <p className="text-PrimaryBlack text-2xl font-bold pb-5">
              {t("Brand")}
            </p>
            {brands.map((data) => {
              return (
                <div
                  key={v4()}
                  onClick={() => {
                    if (selectedBrand === data.brandName) {
                      setSelectedBrand("");
                    } else {
                      setSelectedBrand(data.brandName);
                    }
                  }}
                  className="cursor-pointer flex gap-2.5 items-center pb-2"
                >
                  <input
                    type="checkbox"
                    name={data.brandName}
                    checked={selectedBrand === data.brandName}
                  />
                  <p className="text-base text-PrimaryBlack">
                    {data.brandName}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col pb-8">
              <p className="text-PrimaryBlack text-2xl font-bold pb-5">
                {t("Size")}
              </p>
              <div className="w-full flex gap-x-3 gap-y-3 items-center flex-wrap">
                {sizes.map((size) => {
                  return (
                    <div
                      onClick={() => {
                        if (selectedSize === size.sizeName) {
                          setSelectedSize("");
                        } else {
                          setSelectedSize(size.sizeName);
                        }
                      }}
                      style={{
                        backgroundColor: `${
                          selectedSize === size.sizeName
                            ? "black"
                            : "transparent"
                        }`,
                      }}
                      key={v4}
                      className="w-11 h-9 border cursor-pointer flex justify-center items-center"
                    >
                      <p
                        style={{
                          color: `${
                            selectedSize === size.sizeName ? "white" : "black"
                          }`,
                        }}
                        className="text-[15px] font-semibold"
                      >
                        {size.sizeName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleFilter}
              className="text-white bg-PrimaryOrange py-2 px-5 w-fit font-semibold"
            >
              {t("FILTER")}
            </button>
          </div>
        </div>
        <div className="w-[75%] max-[900px]:w-full">
          <div className="w-full flex flex-wrap gap-x-[2%] gap-y-4">
            {products.length > 0 ? (
              products.map((data) => {
                return (
                  <Link
                    href={pathname.slice(0, 3).concat(`/shop/${data.id}`)}
                    className="w-[31.3%] flex flex-col max-[900px]:w-full "
                    key={v4()}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${data.productPictures[0]})`,
                      }}
                      className="productImageBox w-full bg-center h-80 max-[900px]:h-96 bg-cover bg-no-repeat overflow-hidden relative"
                    >
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
              })
            ) : (
              <div className="w-full pt-32 flex justify-center items-center">
                <p className="text-xl font-bold text-PrimaryBlack">
                  No Product Found
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
