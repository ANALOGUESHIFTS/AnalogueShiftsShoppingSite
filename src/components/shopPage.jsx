import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    img: "images/man-1.jpg",
    category: "COAT",
    name: "Pure Pineapple",
    priceBefore: "$35.00",
    priceAfter: "$14.00",
  },
  {
    img: "images/man-2.jpg",
    category: "SHOES",
    name: "Pure Coat",
    priceAfter: "$25.00",
    priceBefore: "$38.00",
  },
  {
    img: "images/man-3.jpg",
    category: "CLOTHES",
    name: "Pure Coat",
    priceAfter: "$40.00",
    priceBefore: "$65.00",
  },
  {
    img: "images/man-4.jpg",
    category: "SHOES",
    name: "Pure Coat",
    priceAfter: "$25.00",
    priceBefore: "$77.00",
  },
  {
    img: "images/women-2.jpg.webp",
    category: "SHOES",
    name: "Pure Coat",
    priceAfter: "$25.00",
    priceBefore: "$300.00",
  },

  {
    img: "images/women-1.jpg.webp",
    category: "COAT",
    name: "Pure Pineapple",
    priceBefore: "$35.00",
    priceBefore: "$35.00",
  },
  {
    img: "images/women-2.jpg.webp",
    category: "SHOES",
    name: "Pure Coat",
    priceAfter: "$25.00",
    priceBefore: "$40.00",
  },
  {
    img: "images/women-3.jpg.webp",
    category: "CLOTHES",
    name: "Pure Coat",
    priceAfter: "$40.00",
    priceBefore: "$55.00",
  },
  {
    img: "images/women-4.jpg.webp",
    category: "SHOES",
    name: "Pure Coat",
    priceAfter: "$25.00",
    priceBefore: "$35.00",
  },
  {
    img: "images/women-2.jpg.webp",
    category: "SHOES",
    name: "Pure Coat",
    priceAfter: "$25.00",
    priceBefore: "$40.00",
  },
  {
    img: "images/women-3.jpg.webp",
    category: "CLOTHES",
    name: "Pure Coat",
    priceAfter: "$40.00",
    priceBefore: "$55.00",
  },
  {
    img: "images/women-4.jpg.webp",
    category: "SHOES",
    name: "Pure Coat",
    priceAfter: "$25.00",
    priceBefore: "$35.00",
  },
];

export default function ShopPage() {
  const [calvinKlein, setCalvinKlein] = useState(false);
  const [diesel, setDiesel] = useState(false);
  const [polo, setPolo] = useState(false);
  const [tommyHilfiger, setTommyHilfiger] = useState(false);
  const [startingPrice, setStartingPrice] = useState("$33");
  const [endingPrice, setEndingPrice] = useState("$98");
  const [selectedSize, setSelectedSize] = useState("");
  const [sortingType, setSortingType] = useState("");
  const [amountToDisplay, setAmountToDisplay] = useState(
    products.length <= 9 ? products.length : 9
  );
  const [optionsList, setOptionsList] = useState([amountToDisplay]);
  const [showValue, setShowValue] = useState(amountToDisplay);

  const tags = [
    "Towel",
    "Shoes",
    "Coat",
    "Dresses",
    "Trousers",
    "Men's Hat",
    "Backpack",
  ];
  const sizes = ["S", "M", "L", "XS"];

  const loadMore = () => {
    if (showValue < products.length && products.length <= showValue + 9) {
      setShowValue(products.length);
    } else if (showValue < products.length && products.length > showValue + 9) {
      setShowValue((prev) => prev + 9);
    }
  };

  useEffect(() => {
    let minimum = 9;
    while (products.length > minimum) {
      if (products.length <= minimum + 9) {
        setOptionsList([...optionsList, products.length]);
        minimum += products.length;
      } else {
        setOptionsList([...optionsList, minimum + 9]);
        minimum += 9;
      }
    }
  }, []);

  return (
    <main className="w-full p-28 flex max-[1000px]:px-12 max-[800px]:px-8 max-[900px]:py-20 max-[900px]:flex-col max-[900px]:gap-6">
      <div className="w-[25%] flex flex-col max-[900px]:w-full">
        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">
            Categories
          </p>
          <Link to="" className="text-base text-PrimaryBlack/80 pb-2">
            Men
          </Link>
          <Link to="" className="text-base text-PrimaryBlack/80 pb-2">
            Women
          </Link>
          <Link to="" className="text-base text-PrimaryBlack/80">
            Kids
          </Link>
        </div>
        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">Brand</p>
          <div
            onClick={() => setCalvinKlein((prev) => !prev)}
            className="cursor-pointer flex gap-2.5 items-center pb-2"
          >
            <input
              type="checkbox"
              name="Calvin Klein"
              value={calvinKlein}
              checked={calvinKlein}
            />
            <p className="text-base text-PrimaryBlack">Calvin Klein</p>
          </div>
          <div
            onClick={() => setDiesel((prev) => !prev)}
            className="cursor-pointer flex gap-2.5 items-center pb-2"
          >
            <input
              type="checkbox"
              name="Diesel"
              value={diesel}
              checked={diesel}
            />
            <p className="text-base text-PrimaryBlack">Diesel</p>
          </div>
          <div
            onClick={() => setPolo((prev) => !prev)}
            className="cursor-pointer flex gap-2.5 items-center pb-2"
          >
            <input type="checkbox" name="Polo" value={polo} checked={polo} />
            <p className="text-base text-PrimaryBlack">Polo</p>
          </div>
          <div
            onClick={() => setTommyHilfiger((prev) => !prev)}
            className="cursor-pointer flex gap-2.5 items-center pb-2"
          >
            <input
              type="checkbox"
              name="Tommy Hilfiger"
              value={tommyHilfiger}
              checked={tommyHilfiger}
            />
            <p className="text-base text-PrimaryBlack">Tommy Hilfiger</p>
          </div>
        </div>
        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">Price</p>
          <div className="flex items-center gap-1 pb-5">
            <input
              type="text"
              className="outline-none border px-2 py-1.5 text-base text-PrimaryBlack w-14"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
            />
            <p className="w-4 border-b"></p>
            <input
              type="text"
              className="outline-none border px-2 py-1.5 text-base text-PrimaryBlack w-14"
              value={endingPrice}
              onChange={(e) => setEndingPrice(e.target.value)}
            />
          </div>
          <button className="text-white bg-PrimaryOrange py-2 px-5 w-fit font-semibold">
            FILTER
          </button>
        </div>
        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">Color</p>
          <div className="w-9/12 flex justify-between items-center pb-4">
            <div className="flex w-24 gap-3 items-center cursor-pointer">
              <div className="w-5 h-5 rounded-[50%] bg-PrimaryBlack"></div>
              <p className="text-base text-PrimaryBlack/80">Black</p>
            </div>
            <div className="flex w-24 gap-3 items-center cursor-pointer">
              <div className="w-5 h-5 rounded-[50%] bg-violet-700"></div>
              <p className="text-base text-PrimaryBlack/80">Violet</p>
            </div>
          </div>
          <div className="w-9/12 flex justify-between items-center pb-4">
            <div className="flex w-24 gap-3 items-center cursor-pointer">
              <div className="w-5 h-5 rounded-[50%] bg-blue-700"></div>
              <p className="text-base text-PrimaryBlack/80">Blue</p>
            </div>
            <div className="flex w-24 gap-3 items-center cursor-pointer">
              <div className="w-5 h-5 rounded-[50%] bg-yellow-500"></div>
              <p className="text-base text-PrimaryBlack/80">Yellow</p>
            </div>
          </div>
          <div className="w-9/12 flex justify-between items-center">
            <div className="flex w-24 gap-3 items-center cursor-pointer">
              <div className="w-5 h-5 rounded-[50%] bg-red-600"></div>
              <p className="text-base text-PrimaryBlack/80">Red</p>
            </div>
            <div className="flex w-24 gap-3 items-center cursor-pointer">
              <div className="w-5 h-5 rounded-[50%] bg-green-500"></div>
              <p className="text-base text-PrimaryBlack/80">Green</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">Size</p>
          <div className="w-full flex gap-3 items-center">
            {sizes.map((size) => {
              return (
                <div
                  onClick={() => setSelectedSize(size)}
                  style={{
                    backgroundColor: `${
                      selectedSize === size ? "black" : "transparent"
                    }`,
                  }}
                  key={size}
                  className="w-11 h-9 border cursor-pointer flex justify-center items-center"
                >
                  <p
                    style={{
                      color: `${selectedSize === size ? "white" : "black"}`,
                    }}
                    className="text-[15px] font-semibold"
                  >
                    {size}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col pb-8">
          <p className="text-PrimaryBlack text-2xl font-bold pb-5">Tags</p>
          <div className="w-full flex gap-3 items-center flex-wrap">
            {tags.map((tag) => {
              return (
                <Link
                  to=""
                  key={tag}
                  className="w-auto px-5 h-9 border cursor-pointer flex justify-center items-center"
                >
                  <p className="text-base text-PrimaryBlack/70 font-semibold">
                    {tag}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[75%] max-[900px]:w-full">
        <div className="w-full flex justify-between items-center pb-5 max-[900px]:flex-col max-[900px]:gap-3">
          <div className="flex max-[900px]:w-full gap-3 max-[900px]:gap-[5%]">
            <select
              value={sortingType}
              onChange={(e) => setSortingType(e.target.value)}
              name="Sorting"
              className="outline-none border py-2.5 px-4 w-52 max-[900px]:w-[45%] text-[15px] text-PrimaryBlack/70 font-semibold cursor-pointer"
            >
              <option value="Default Sorting">Default Sorting</option>
            </select>
            <select
              value={showValue}
              onChange={(e) => setShowValue(e.target.value)}
              className="outline-none border py-2.5 px-4 w-52 max-[900px]:w-[45%] text-[15px] text-PrimaryBlack/70 font-semibold cursor-pointer"
            >
              {optionsList.map((num) => {
                return (
                  <option key={num} value={num}>
                    Show: &nbsp; {num}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="text-base text-PrimaryBlack/70 font-semibold max-[900px]:w-full">
            Show {showValue} Of {products.length} Product
          </p>
        </div>
        <div className="w-full flex flex-wrap gap-x-[2%] gap-y-4">
          {products.slice(0, showValue).map((data) => {
            return (
              <div
                className="w-[31.3%] flex flex-col max-[900px]:w-full "
                key={data.img}
              >
                <div
                  style={{ backgroundImage: `url(${data.img})` }}
                  className="productImageBox w-full h-80 max-[900px]:h-96 bg-cover bg-no-repeat overflow-hidden relative"
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
                        Quick View
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
                    {data.priceAfter}&nbsp;
                    {data.priceBefore && (
                      <p
                        className="text-base text-PrimaryBlack/50 font-normal relative"
                        id="priceBefore"
                      >
                        {data.priceBefore}
                      </p>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-center pt-5">
          <button
            disabled={showValue === products.length}
            style={{ opacity: `${showValue === products.length ? 0.5 : 1}` }}
            onClick={loadMore}
            className="font-bold text-PrimaryBlack text-base pb-1 border-b-2 border-solid border-PrimaryOrange"
          >
            Load More
          </button>
        </div>
      </div>
    </main>
  );
}
