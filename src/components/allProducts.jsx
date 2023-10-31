import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { v4 } from "uuid";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase";
import LoadingTwo from "./loadingTwo";
import IdiomProof from "./idiomProof";
import { Link } from "react-router-dom";
import UploadProduct from "./uploadProduct";

export default function Products() {
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idiomModal, setIdiomModal] = useState(false);
  const [valueToDelete, setValueToDelete] = useState([]);
  const [products, setProducts] = useState([]);

  //avilabe datas
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);

  const productsCollectionRef = collection(db, "products");
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

      setInitialProducts(filteredData);
      setProducts([]);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Products");
    }
  };

  const deleteFiles = async (folder) => {
    try {
      await listAll(ref(storage, `${folder}/`)).then((data) =>
        data.items.forEach((item) => {
          deleteObject(item);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id, folder) => {
    setLoading(true);
    const productDoc = doc(db, "products", id);
    try {
      await deleteDoc(productDoc);
      await deleteFiles(folder);
      await getProducts();
      location.reload();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Deleting Product");
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

  const getDatas = async () => {
    setLoading(true);
    try {
      await getBrands();
      await getCategories();
      await getSizes();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Error Fetching data, please try again");
    }
  };

  const uploadFiles = async (arr, folder) => {
    try {
      for (var file of arr) {
        await uploadBytes(ref(storage, `${folder}/${file.name + v4()}`), file);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (data) => {
    setLoading(true);
    try {
      await addDoc(productsCollectionRef, {
        brand: data.productBrand,
        category: data.productCategory,
        colors: data.productColors,
        description: data.productDescription,
        name: data.productName,
        priceAfter: Number(data.productPriceAfter),
        priceBefore: Number(data.productPriceBefore),
        sizes: data.productSizes,
        productImagesFolder: data.productImagesFolder,
      });
      await uploadFiles(data.productImages, data.productImagesFolder);
      await getProducts();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Adding Product");
    }
  };

  useEffect(() => {
    getDatas();
    getProducts();
  }, []);

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
  }, [pictures, initialProducts]);

  return (
    <>
      {idiomModal && (
        <IdiomProof
          question="Are You sure you want to delete this product?"
          cancel={() => setIdiomModal(false)}
          submit={() => {
            setIdiomModal(false);
            deleteProduct(valueToDelete[0], valueToDelete[1]);
          }}
        />
      )}
      {modal && (
        <UploadProduct
          cancel={() => setModal(false)}
          availableBrands={brands}
          availableCategories={categories}
          availableSizes={sizes}
          submit={(data) => {
            setModal(false);
            addProduct(data);
          }}
        />
      )}
      {loading && <LoadingTwo />}
      <div className="w-full">
        <div className="w-full flex justify-center flex-wrap gap-12">
          <p className="text-sm font-bold text-PrimaryBlack/90">
            <i className="fa-solid fa-list text-PrimaryBlack/80"></i>&nbsp;
            {t("All Products")}
          </p>
          <p
            onClick={() => setModal(true)}
            className="text-sm cursor-pointer font-bold text-PrimaryBlack/90"
          >
            <i className="fa-solid fa-plus text-PrimaryBlack/80"></i>&nbsp;
            {t("Add Product")}
          </p>
        </div>
        <div className="w-full flex flex-wrap gap-x-[2%] gap-y-4 py-5">
          {products.length > 0 &&
            products.map((data) => {
              return (
                <div
                  className="w-[250px] relative flex flex-col max-[900px]:w-full "
                  key={data.id}
                >
                  <img
                    src={data.productPictures[0]}
                    className="absolute top-0 object-cover left-0 w-full h-80"
                  />
                  <div className="productImageBox w-full h-80 max-[900px]:h-96 bg-cover bg-no-repeat overflow-hidden relative">
                    <div className="flex w-[80%] absolute bottom-0 left-[10%] gap-[2%] duration-300 translate-y-20 h-12 menu-row">
                      <button
                        onClick={() => {
                          setValueToDelete([data.id, data.productImagesFolder]);
                          setIdiomModal(true);
                        }}
                        className="h-full w-[30%] bg-PrimaryOrange flex justify-center items-center text-white"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <Link
                        to={`/product-details/${data.id}`}
                        className="h-full w-[70%] bg-white flex justify-center items-center text-PrimaryBlack"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>&nbsp;
                        <p className="font-bold text-PrimaryBlack text-sm">
                          {t("Quick View")}
                        </p>
                      </Link>
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
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
