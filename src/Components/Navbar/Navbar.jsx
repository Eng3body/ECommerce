/* eslint-disable no-unused-vars */
import React, { useContext  ,  } from "react";
// import classes from "./Navbar.module.css"
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  function handelLogout() {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  }
  const {numOfCartItems}= useContext(CartContext)
  const {numOfWishlistItems}= useContext(WishlistContext)


 
  return (
    <>
      <nav className=" bg-gray-100 p-4 static lg:fixed top-0 end-0 start-0 z-40">
        <div className="container mx-auto flex justify-between  flex-col lg:flex-row">
          <div className="flex  items-center flex-col lg:flex-row ">
            <Link className="ms-5" to={""}>
              {" "}
              <img src={logo} alt="Fresh cart logo"></img>{" "}
            </Link>

            {accessToken && (
              <div className=" flex justify-start   items-start  ">
                <ul className="flex flex-col lg:flex-row  ">
                  <li className="my-2 lg:my-0">
                    <NavLink className="p-2 lg:ms-5" to={""}>
                      Home
                    </NavLink>
                  </li>

                  <li className="my-2 lg:my-0">
                    <NavLink className="p-2" to={"/products"}>
                      Products
                    </NavLink>
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className="p-2" to={"/categories"}>
                      Categories
                    </NavLink>
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className="p-2" to={"/brands"}>
                      Brands
                    </NavLink>
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className="p-1 " to={"/cart"}>
                      <button
                        type="button"
                        className="relative inline-flex items-center p-2 text-sm font-medium text-center
                          text-black    focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        <i className="fas fa-cart-shopping fa-xl"></i>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {numOfCartItems}
                        </div>
                      </button>
                    </NavLink>
                    
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className="p-1 " to={"/wishlist"}>
                      <button
                        type="button"
                        className="relative inline-flex items-center p-2 text-sm font-medium text-center
                          text-black    focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        <i className="fas fa-heart fa-xl"></i>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {numOfWishlistItems}
                        </div>
                      </button>
                    </NavLink>
                    
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-center  justify-items-start ">
            <ul className="flex flex-col lg:flex-row   items-center">
              
              
              {accessToken ? (
                <> <li className="my-2 lg:my-0">
                <a href="" className="fab fa-facebook mx-2">
                  {" "}
                </a>
                <a href="" className="fab fa-twitter mx-2">
                  {" "}
                </a>
                <a href="" className="fab fa-youtube mx-2">
                  {" "}
                </a>
                <a href="" className="fab fa-instagram mx-2">
                  {" "}
                </a>
                <a href="" className="fab fa-tiktok mx-2">
                  {" "}
                </a>
              </li>
               
                  <li className="my-2 lg:my-0">
                    <Link className="p-2" onClick={handelLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="my-2 lg:my-0">
                    <NavLink className="p-2" to={"/login"}>
                      Login
                    </NavLink>
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className="p-2" to={"/register"}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
             
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
