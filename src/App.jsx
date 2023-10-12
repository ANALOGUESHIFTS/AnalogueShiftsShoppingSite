import "./App.css";
import { useState, useEffect } from "react";

//Routing
import { Routes, Route, Link } from "react-router-dom";

//Components
import LoadingComponent from "./components/loadingComponent";
import TopbarComponent from "./components/topbarComponent";
import HeaderComponent from "./components/headerComponent";
import NavBarComponent from "./components/navBarComponent";

//Pages
import HomePage from "./components/homePage";
import ShopPage from "./components/shopPage";
import BlogPage from "./components/blogPage";
import ContactPage from "./components/contactPage";
import ShoppingCart from "./components/shoppingCart";
import ProductDetails from "./components/productDetails";
import CheckOutPage from "./components/checkoutPage";
import RegisterPage from "./components/registerPage";

function App() {
  const [loading, setLoading] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  //Logos
  const logos = [
    "/images/logo-1.png",
    "/images/logo-2.png",
    "/images/logo-3.png",
    "/images/logo-4.png",
    "/images/logo-5.png",
  ];

  //Social Icons
  const socialIcons = [
    "fa-brands fa-facebook-f text-white",
    "fa-brands fa-instagram text-white",
    "fa-brands fa-twitter text-white",
    "fa-brands fa-pinterest text-white",
  ];

  //Handling Loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <main className="w-screen h-screen">
      {loading ? (
        <LoadingComponent />
      ) : (
        <main className="w-full">
          <TopbarComponent />
          <HeaderComponent />
          <NavBarComponent />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <footer className="w-full">
            <div
              id="hideScrollBar"
              className="h-28 px-28 bg-[#303030] grid grid-cols-5 items-center max-[800px]:px-5 max-[1000px]:px-12 max-[900px]:flex max-[900px]:w-full max-[900px]:gap-4 max-[900px]:overflow-x-scroll"
            >
              {logos.map((logo) => {
                return (
                  <img
                    className="col-span-1 bg-cover bg-center"
                    src={logo}
                    alt=""
                  />
                );
              })}
            </div>
            <div className="bg-PrimaryBlack border-b border-solid border-white/50 p-28 w-full grid grid-cols-10 max-[1000px]:px-12 max-[800px]:px-5 max-[800px]:py-20 max-[900px]:flex max-[900px]:flex-col max-[900px]:gap-5">
              <div className="col-span-3 flex flex-col">
                <Link to="/">
                  <img src="/images/footer-logo.png" alt="" />
                </Link>
                <div className="flex flex-col w-full pt-7 gap-2">
                  <p className="text-white/70 text-base ">
                    Address: 60-49 Road 11378 New York
                  </p>
                  <p className="text-white/70 text-base ">
                    Phone: +65 11.188.888
                  </p>
                  <p className="text-white/70 text-base ">
                    Email: hello.colorlib@gmail.com
                  </p>
                </div>
                <div className="pt-6 flex gap-2">
                  {socialIcons.map((icon) => {
                    return (
                      <Link key={icon}>
                        <div className="w-11 h-11 bg-[#303030] rounded-[50%] duration-300 hover:bg-PrimaryOrange flex justify-center items-center">
                          <i className={icon}></i>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-2 flex flex-col">
                <p className="text-white font-bold text-base">Information</p>
                <div className="flex flex-col w-full pt-7 gap-2">
                  <Link to="" className="text-white/70 text-base ">
                    About Us
                  </Link>
                  <Link to="" className="text-white/70 text-base ">
                    Checkout
                  </Link>
                  <Link to="" className="text-white/70 text-base ">
                    Contact
                  </Link>
                  <Link to="" className="text-white/70 text-base ">
                    Services
                  </Link>
                </div>
              </div>
              <div className="col-span-2 flex flex-col">
                <p className="text-white font-bold text-base">My Account</p>
                <div className="flex flex-col w-full pt-7 gap-2">
                  <Link to="" className="text-white/70 text-base ">
                    My Account
                  </Link>
                  <Link to="" className="text-white/70 text-base ">
                    Contact
                  </Link>
                  <Link to="" className="text-white/70 text-base ">
                    Shopping Cart
                  </Link>
                  <Link to="" className="text-white/70 text-base ">
                    Shop
                  </Link>
                </div>
              </div>
              <div className="col-span-3 flex flex-col">
                <p className="text-white font-bold text-base">
                  Join Our Newsletter Now
                </p>
                <div className="flex flex-col w-full pt-7 gap-2">
                  <p className="text-white/70 text-base ">
                    Get E-mail updates about our latest shop and special offers.
                  </p>
                  <div className="flex h-11 w-full">
                    <input
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      type="text"
                      className="w-[70%] h-full border-none outline-none text-white/80 text-base font-medium pl-3.5 bg-[#303030]"
                      placeholder="Enter Your Email"
                    />
                    <button className="w-[30%] h-full border-none bg-PrimaryOrange text-white text-[13px] font-bold">
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-PrimaryBlack w-full py-5 flex items-center justify-between">
              <p className="text-white/70 text-base  px-28">
                Copyright ©2023 All rights reserved
              </p>
            </div>
          </footer>
        </main>
      )}
    </main>
  );
}

export default App;
