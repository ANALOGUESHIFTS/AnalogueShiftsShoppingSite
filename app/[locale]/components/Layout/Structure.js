"use client";
//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "../../contexts/CartContext";
import TopbarComponent from "./TopBar";
import HeaderComponent from "./Header";
import NavBarComponent from "./NavBar";
import Footer from "./Footer";

//Context

export default function Structure({ children }) {
  return (
    <CartProvider>
      <main className="w-full">
        <ToastContainer position="top-center" />
        <TopbarComponent />
        <HeaderComponent />
        <NavBarComponent />
        {children}
        <Footer />
      </main>
    </CartProvider>
  );
}
