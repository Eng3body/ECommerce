/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlistDetails } = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check if the product is already in the wishlist
    if (wishlistDetails) {
      const productInWishlist = wishlistDetails.some(
        (wishlistItem) => wishlistItem.id === product.id
      );
      setIsInWishlist(productInWishlist);
    }
  }, [wishlistDetails, product.id]);

  async function addProductToCart(productId) {
    const res = await addToCart(productId);
    if (res && res.status === "success") {
      toast.success(res.message, {
        position: "top-center",
      });
    } else {
      toast.error("Failed to Add to Cart", {
        position: "top-center",
        theme: "dark",
      });
    }
  }

  async function toggleWishlist(productId) {
    if (isInWishlist) {
      const res = await removeFromWishlist(productId);
      if (res && res.status === "success") {
        setIsInWishlist(false);
        toast.success(res.message, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to Remove from Wishlist", {
          position: "top-center",
        });
      }
    } else {
      const res = await addToWishlist(productId);
      if (res && res.status === "success") {
        setIsInWishlist(true);
        toast.success(res.message, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to Add to Wishlist", {
          position: "top-center",
        });
      }
    }
  }

  return (
    <>
      <div className="w-1/4 p-4 mb-4 product relative container"  key={product.id}>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute mb-4 text-lg top-2 right-2 text-gray-400 hover:text-green-500 focus:outline-none"
        >
          <i
            className={`fas fa-heart  ${isInWishlist ? "text-green-500" : ""}`}
          ></i>
        </button>
        <Link to={`/productDetails/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} alt={product.title}></img>
          <span className="mb-2 mt-3 text-green-500 ">
            {product.category.name}
          </span>
          <h2 className="font-semibold truncate mb-2 mt-1">{product.title}</h2>
          <div className="flex justify-between text-gray-500">
            <span>{product.price} EGP</span>
            <div>
              <i className="fas fa-star text-yellow-300"></i>
              <span> {product.ratingsAverage}</span>
            </div>
          </div>
        </Link>

        <button
          onClick={() => addProductToCart(product.id)}
          className=" mt-4 btn bg-green-500 w-full text-white"
        >
          Add To Cart
        </button>
      </div>
    </>
  );
}
