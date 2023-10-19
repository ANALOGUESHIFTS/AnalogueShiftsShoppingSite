import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const containerRef = useRef();

  const toggleMenu = () => {
    let elem = document.getElementById("menuBar");
    if (elem.style.left !== "0px") {
      elem.style.left = "0px";
    } else {
      elem.style.left = "-300px";
    }
  };

  useEffect(() => {
    containerRef.current.scrollTop = 0;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <main
      className="px-20 py-7 w-full flex justify-between bg-[#efeff1] max-[1000px]:px-12 max-[800px]:px-5"
      ref={containerRef}
    >
      <aside
        id="menuBar"
        className="w-[280px] h-[500px] relative rounded-lg bg-white flex flex-col overflow-hidden max-[800px]:flex max-[800px]:top-0 max-[800px]:fixed max-[800px]:h-screen max-[800px]:shadow-xl max-[800px]:rounded-none max-[800px]:left-[-300px] duration-500"
      >
        <Link
          to="/profile/"
          className="px-5 py-3 flex items-center gap-4 bg-[#d4d4d6] "
        >
          <i className="fa-regular fa-user text-PrimaryBlack text-xs"></i>
          <p className="text-PrimaryBlack font-semibold text-sm">
            My Cinnamon Account
          </p>
        </Link>
        <Link
          to="/profile/address-book"
          className="px-5 py-3 flex items-center gap-4 bg-transparent hover:bg-black/10"
        >
          <i className="fa-solid fa-book-open text-PrimaryBlack text-xs"></i>
          <p className="text-PrimaryBlack font-semibold text-sm">
            Addresss Book
          </p>
        </Link>
        <Link
          to=""
          className="px-5 py-3 flex items-center gap-4 bg-transparent w-full hover:bg-black/10"
        >
          <i className="fa-solid fa-right-from-bracket text-red-500 text-xs"></i>
          <p className="text-red-500 font-bold text-sm">Log Out</p>
        </Link>
      </aside>
      <section className="w-[calc(100%-300px)] h-[500px] bg-white rounded-lg max-[800px]:w-full max-[500px]:h-auto">
        <p className="text-PrimaryBlack/80 text-lg font-bold px-5 py-3 border-b text-center h-[50px] max-[800px]:text-left max-[800px]:flex max-[800px]:justify-between">
          Account Overview
          <i
            onClick={toggleMenu}
            className="fa-solid fa-bars hidden max-[800px]:flex text-PrimaryBlack/80 max-[800px]:cursor-pointer"
          ></i>
        </p>
        <div className="w-full grid grid-cols-2 max-[500px]:flex max-[500px]:flex-col">
          <div className="col-span-1 border-r h-[450px] max-[500px]:w-full max-[500px]:h-[250px] max-[500px]:border-r-0 max-[500px]:border-b">
            <div className="w-full px-5 h-[50px] flex justify-between items-center border-b">
              <p className="text-PrimaryBlack/80 text-base font-semibold">
                Account Details
              </p>
              <i className="fa-solid fa-edit cursor-pointer text-PrimaryOrange"></i>
            </div>
          </div>
          <div className="col-span-1 h-[450px] max-[500px]:w-full max-[500px]:h-[250px]">
            <div className="w-full px-5 h-[50px] flex justify-between items-center border-b">
              <p className="text-PrimaryBlack/80 text-base font-semibold">
                Address Book
              </p>
              <Link to="/profile/address-book">
                <i className="fa-solid fa-edit cursor-pointer text-PrimaryOrange"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
