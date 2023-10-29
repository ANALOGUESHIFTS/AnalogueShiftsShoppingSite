import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { auth } from "../config/firebase";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import LoadingTwo from "./loadingTwo";
import EditUserDetails from "./editUserDetails";
import IdiomProof from "./idiomProof";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [user, setUser] = useState({});
  const containerRef = useRef();
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    let elem = document.getElementById("menuBar");
    if (elem.style.left !== "0px") {
      elem.style.left = "0px";
    } else {
      elem.style.left = "-300px";
    }
  };

  useEffect(() => {
    if (!loading) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        console.log(user);
      } else {
        navigate("/login");
      }
    });
  }, []);

  const updateUserDetails = async (data) => {
    setLoading(true);
    try {
      updateProfile(auth.currentUser, {
        displayName: data.name,
      }).then(() => {
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Updating Details, Please Try again Later");
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      signOut(auth).then(() => {
        navigate("/");
      });
    } catch (err) {
      alert("Error Signing Out, Please Try Again");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingTwo />}
      {editModal && (
        <EditUserDetails
          cancel={() => setEditModal(false)}
          name={user ? user.displayName : ""}
          submit={(data) => {
            setEditModal(false);
            updateUserDetails(data);
          }}
        />
      )}
      {logoutModal && (
        <IdiomProof
          cancel={() => setLogoutModal(false)}
          submit={() => {
            setLogoutModal(false);
            logOut();
          }}
          question={"Are you sure you want to sign out of your account?"}
        />
      )}
      <main
        className="px-20 py-7 w-full flex justify-between bg-[#efeff1] max-[1000px]:px-12 max-[800px]:px-5"
        ref={containerRef}
      >
        <aside
          style={{ zIndex: `${loading || editModal ? 1 : "auto"}` }}
          id="menuBar"
          className="w-[280px] h-[500px] relative rounded-lg bg-white flex flex-col overflow-hidden max-[800px]:flex max-[800px]:top-0 max-[800px]:fixed max-[800px]:h-screen max-[800px]:shadow-xl max-[800px]:rounded-none max-[800px]:left-[-300px] duration-500"
        >
          <Link
            to="/profile/"
            className="px-5 py-3 flex items-center gap-4 bg-[#d4d4d6] "
          >
            <i className="fa-regular fa-user text-PrimaryBlack text-xs"></i>
            <p className="text-PrimaryBlack font-semibold text-sm">
              {t("My Cinnamon Account")}
            </p>
          </Link>
          <Link
            to="/profile/address-book"
            className="px-5 py-3 flex items-center gap-4 bg-transparent hover:bg-black/10"
          >
            <i className="fa-solid fa-book-open text-PrimaryBlack text-xs"></i>
            <p className="text-PrimaryBlack font-semibold text-sm">
              {t("Address Book")}
            </p>
          </Link>
          <div
            onClick={() => setLogoutModal(true)}
            className="px-5 cursor-pointer py-3 flex items-center gap-4 bg-transparent w-full hover:bg-black/10"
          >
            <i className="fa-solid fa-right-from-bracket text-red-500 text-xs"></i>
            <p className="text-red-500 font-bold text-sm">{t("Log Out")}</p>
          </div>
        </aside>
        <section className="w-[calc(100%-300px)] h-[500px] bg-white rounded-lg max-[800px]:w-full max-[500px]:h-auto">
          <p className="text-PrimaryBlack/80 text-lg font-bold px-5 py-3 border-b text-center h-[50px] max-[800px]:text-left max-[800px]:flex max-[800px]:justify-between">
            {t("Account Overview")}
            <i
              onClick={toggleMenu}
              className="fa-solid fa-bars hidden max-[800px]:flex text-PrimaryBlack/80 max-[800px]:cursor-pointer"
            ></i>
          </p>
          <div className="w-full grid grid-cols-2 max-[500px]:flex max-[500px]:flex-col">
            <div className="col-span-1 border-r h-[450px] max-[500px]:w-full max-[500px]:h-[250px] max-[500px]:border-r-0 max-[500px]:border-b">
              <div className="w-full px-5 h-[50px] flex justify-between items-center border-b">
                <p className="text-PrimaryBlack/80 text-base font-semibold">
                  {t("Account Details")}
                </p>
                <i
                  className="fa-solid fa-edit cursor-pointer text-PrimaryOrange"
                  onClick={() => setEditModal(true)}
                ></i>
              </div>
              <div className="w-full px-5 py-3 flex flex-col gap-3">
                <p className="text-PrimaryBlack/80 text-base font-semibold">
                  {user.displayName}
                </p>
                <p className="text-PrimaryBlack/80 text-base font-semibold">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="col-span-1 h-[450px] max-[500px]:w-full max-[500px]:h-[250px]">
              <div className="w-full px-5 h-[50px] flex justify-between items-center border-b">
                <p className="text-PrimaryBlack/80 text-base font-semibold">
                  {t("Address Book")}
                </p>
                <Link to="/profile/address-book">
                  <i className="fa-solid fa-edit cursor-pointer text-PrimaryOrange"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
