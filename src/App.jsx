import "./App.css";
import { useState, useEffect } from "react";

//Routing
import { Routes, Route } from "react-router-dom";

//Firebase
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

//Components
import Footer from "./components/footer";
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
import LoginPage from "./components/login";
import FaqPage from "./components/faq";
import BlogDetailsPage from "./components/blogDetailsPage";
import AboutPage from "./components/aboutPage";
import ProfilePage from "./components/profilePage";
import AddressBookPage from "./components/addressBookPage";
import NotFound from "./components/notFound";
import ManagementPage from "./components/managementPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  //Handling Loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        console.log(user);
      } else {
        setUser({});
      }
    });
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/blog-details/:id" element={<BlogDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/address-book" element={<AddressBookPage />} />
            {user && user.email === "cinnamon19fashion@gmail.com" && (
              <Route path="/management" element={<ManagementPage />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      )}
    </main>
  );
}

export default App;
