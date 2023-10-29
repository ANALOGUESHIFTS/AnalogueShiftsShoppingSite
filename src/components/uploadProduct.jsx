import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { v4 } from "uuid";

export default function UploadProduct({
  submit,
  cancel,
  availableSizes,
  availableCategories,
  availableBrands,
}) {
  const [opacity, setOpacity] = useState(0);

  //Product to add
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState();
  const [priceAfter, setPriceAfter] = useState();
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  //Tracker
  const [colorValue, setColorValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");

  const { t, i18n } = useTranslation();

  const handleSubmit = () => {
    submit({
      productName: name,
      productImages: images,
      productDescription: description,
      productPriceBefore: priceBefore,
      productPriceAfter: priceAfter,
      productColors: colors,
      productSizes: sizes,
      productCategory: category,
      productBrand: brand,
      productImagesFolder: v4(),
    });
  };

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div
      style={{ zIndex: 5, opacity: opacity }}
      className="w-screen duration-500 h-screen fixed flex top-0 left-0 justify-center pt-16 bg-black/20"
    >
      <div className="bg-white duration-500 rounded-lg max-w-[90%] w-[500px] h-[500px] overflow-y-auto pb-4">
        <div className="w-full h-10 border-b flex justify-between items-center px-4">
          <p className="text-PrimaryBlack/90 text-sm font-bold">Add Product</p>
          <i
            onClick={cancel}
            className="fa-solid fa-xmark cursor-pointer text-PrimaryBlack/80"
          ></i>
        </div>
        <div className="px-4 pt-4 flex flex-col gap-3">
          <input
            type="text"
            value={name}
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2 px-2 border text-sm outline-1 outline-PrimaryOrange text-PrimaryBlack/90"
          />
          <textarea
            name="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description..."
            className="px-2 py-2 text-PrimaryBlack/90 outline-1 outline-PrimaryOrange text-sm border w-full h-24"
            cols="30"
            rows="10"
          ></textarea>
          <select
            name="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full py-2 px-2 border text-PrimaryBlack/90 text-sm outline-1 outline-PrimaryOrange"
          >
            <option value="">Select Category</option>
            {availableCategories.map((data) => {
              return (
                <option value={data.categoryName} key={data.id}>
                  {data.categoryName}
                </option>
              );
            })}
          </select>
          <select
            name="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full py-2 px-2 border text-PrimaryBlack/90 text-sm outline-1 outline-PrimaryOrange"
          >
            <option value="">Select Brand</option>
            {availableBrands.map((data) => {
              return (
                <option value={data.brandName} key={data.id}>
                  {data.brandName}
                </option>
              );
            })}
          </select>

          <input
            type="number"
            className="w-full outline-1 border outline-PrimaryOrange px-2 py-2 text-PrimaryBlack/90 text-sm"
            value={priceBefore}
            onChange={(e) => setPriceBefore(e.target.value)}
            placeholder="Regular Price"
          />
          <input
            type="number"
            className="w-full outline-1 border outline-PrimaryOrange px-2 py-2 text-PrimaryBlack/90 text-sm"
            value={priceAfter}
            onChange={(e) => setPriceAfter(e.target.value)}
            placeholder="Cinnamon's Price"
          />
          <div className="mt-3 w-full border-t py-2">
            <div className="px-2 pt-2 w-full flex justify-between items-center">
              <p className="font-bold text-sm text-PrimaryBlack/90">IMAGES</p>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setImages((prev) => [...prev, e.target.files[0]]);
                    }
                  }}
                  className="w-[140px] outline-1 outline-PrimaryOrange absolute top-0 right-0 opacity-0"
                />
                <div className="flex items-center gap-2">
                  <p className="text-sm text-PrimaryBlack/90 font-bold">
                    Upload
                  </p>
                  <img src="/images/upload.jpg" className="w-6" alt="" />
                </div>
              </div>
            </div>
            {images.length > 0 && (
              <div className="py-2.5 px-3 flex flex-col gap-2">
                {images.map((data) => {
                  return (
                    <div
                      key={Math.random() * Math.random()}
                      className="w-full flex justify-between items-center"
                    >
                      <p className="w-[85%] text-sm font-semibold text-PrimaryBlack/80">
                        {data.name.length < 20
                          ? data.name
                          : data.name.slice(0, 17).concat("...")}
                      </p>
                      <i
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((img) => img.name !== data.name)
                          )
                        }
                        className="fa-solid fa-xmark text-PrimaryBlack/80 cursor-pointer"
                      ></i>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-3 w-full border-t py-2">
            <p className="font-bold text-sm text-PrimaryBlack/90 pb-2 text-center">
              COLORS
            </p>
            <div className="px-2 w-full flex justify-between items-center">
              <input
                type="text"
                placeholder="Enter Color"
                value={colorValue}
                onChange={(e) => setColorValue(e.target.value)}
                className="w-[200px] outline-1 border outline-PrimaryOrange py-2 px-2 text-sm text-PrimaryBlack/90"
              />
              <button
                onClick={() => setColors([...colors, colorValue])}
                className="text-sm text-white px-5 py-2 bg-green-600 hover:bg-green-600/80"
              >
                Add Color&nbsp; <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            {colors.length > 0 && (
              <div className="py-2.5 px-3 flex flex-col gap-2">
                {colors.map((data) => {
                  return (
                    <div
                      key={Math.random() * Math.random()}
                      className="w-full flex justify-between items-center"
                    >
                      <p className="w-[85%] text-sm font-semibold text-PrimaryBlack/80">
                        {data}
                      </p>
                      <i
                        onClick={() =>
                          setColors((prev) =>
                            prev.filter((img) => img !== data)
                          )
                        }
                        className="fa-solid fa-xmark text-PrimaryBlack/80 cursor-pointer"
                      ></i>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-3 w-full border-t py-2">
            <p className="font-bold text-sm text-PrimaryBlack/90 pb-2 text-center">
              SIZES
            </p>
            <div className="px-2 w-full flex justify-between items-center">
              <select
                type="text"
                value={sizeValue}
                onChange={(e) => setSizeValue(e.target.value)}
                className="w-[200px] outline-1 border outline-PrimaryOrange py-2 px-2 text-sm text-PrimaryBlack/90"
              >
                <option value="">Select size</option>
                {availableSizes.map((data) => {
                  return (
                    <option value={data.sizeName} key={data.id}>
                      {data.sizeName}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={() => setSizes([...sizes, sizeValue])}
                className="text-sm text-white px-5 py-2 bg-green-600 hover:bg-green-600/80"
              >
                Add Size&nbsp; <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            {sizes.length > 0 && (
              <div className="py-2.5 px-3 flex flex-col gap-2">
                {sizes.map((data) => {
                  return (
                    <div
                      key={Math.random() * Math.random()}
                      className="w-full flex justify-between items-center"
                    >
                      <p className="w-[85%] text-sm font-semibold text-PrimaryBlack/80">
                        {data}
                      </p>
                      <i
                        onClick={() =>
                          setSizes((prev) => prev.filter((img) => img !== data))
                        }
                        className="fa-solid fa-xmark text-PrimaryBlack/80 cursor-pointer"
                      ></i>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full font-bold text-white text-sm py-2 flex justify-center bg-PrimaryOrange hover:bg-PrimaryOrange/80"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
