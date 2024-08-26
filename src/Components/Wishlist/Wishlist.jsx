/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
import Product from "../Product/Product"; // Import Product component for displaying each product

export default function Wishlist() {
  const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    wishlistDetails,
    wishlistID,
  } = useContext(WishlistContext);
  const { accessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState(null); // State to hold the logged-in user's ID

  // Fetch wishlist details
  async function getWishlistDetails() {
    setIsLoading(true);
    const res = await getWishlist();
    if (res && res.status === "success") {
      setUserID(res.data.userId); // Assuming the user ID is included in the response as `userId`
      setIsLoading(false);
    } else {
      setError(res ? res.message : "Failed to load wishlist");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (accessToken) {
      getWishlistDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // Function to add a product to the wishlist
  async function addProductToWishlist(productId) {
    const res = await addToWishlist(productId);
    if (res && res.status === "success") {
      toast.success("Product Added Successfully");
      getWishlistDetails(); // Refresh wishlist after adding a product
    } else {
      toast.error("Failed to add product to wishlist");
    }
  }

  // Remove product from wishlist
  async function removeProductFromWishlist(productId) {
    const res = await removeFromWishlist(productId);
    if (res && res.status === "success") {
      toast.success("Product Removed Successfully");
      getWishlistDetails(); // Refresh wishlist after removal
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist</title>
      </Helmet>
      <section className="mb-36 mt-10">
        <div className="container mx-auto px-4 text-center">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error text-4xl text-center">
              {error}
            </div>
          ) : wishlistDetails && wishlistDetails.length === 0 ? (
            <div className="text-center mt-10 flex flex-col justify-center items-center text-red-700">
              <h2 className="text-4xl">Your Wishlist is empty</h2>
              <p className="mt-4 text-3xl">
                Looks like you have not added any items yet.
              </p>
              <Link
                to="/"
                className="btn bg-green-500 text-white mt-5 px-4 py-2 w-1/2"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <section className="py-24 ">
                <div className="container mx-auto text-center  text-green-600">
                  <h1 className="mb-10 == text-3xl bold">Wishlist Products</h1>
                  {wishlistDetails?.map((product) => (
                    <div key={product.id} className=" " >
                      <div className="row items-center flex flex-col ">
                        <Product product={product} className="" />{" "}
                        <div>
                          <button
                            onClick={() =>
                              removeProductFromWishlist(product.id)
                            }
                            className="mt-2 mb-5 btn  bg-red-500 text-white"
                          >
                            Remove from Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
}
