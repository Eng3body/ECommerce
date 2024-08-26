// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    getCart,
    cartDetails,
    numOfCartItems,
    removeFromCart,
    updateQuantity,
    clearCartItems,
  } = useContext(CartContext);
  const { accessToken } = useContext(AuthContext);

  async function getCartDetails() {
    const res = await getCart();
    if (res.status == "success") {
      console.log(res);
    } else {
      console.log(res);
    }
  }

  async function deleteCart() {
    const res = await clearCartItems();
    if (res.status == "success") {
      console.log(res);
    } else {
      console.log(res);
    }
  }

  useEffect(() => {
    accessToken && getCartDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  async function removeProductFromCart(productId) {
    const res = await removeFromCart(productId);
    if (res.status == "success") {
      toast.success("Product Removed Successfully");
    } else {
      toast.error("Something went wrong");
    }
  }

  async function updateProductQuantity(productId, count) {
    const res = await updateQuantity(productId, count);
    if (res.status == "success") {
      toast.success("Qty Updated Successfully ");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <section className="py-24 mb-36">
        <div className="container mx-auto px-4 text-center ">
          {/* Check if cart is empty */}
          {numOfCartItems === 0 ? (
            <div className="text-center mt-10 flex flex-col justify-center items-center text-red-700">
              <h2 className="text-4xl">Your cart is empty</h2>
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
              <h1 className="text-5xl text-green-600">Cart</h1>
              <div className="flex flex-wrap justify-between my-4">
                <h4 className="text-xl">
                  Total Items:{" "}
                  <span className="text-green-500">{numOfCartItems}</span>
                </h4>
                <div>
                  <h4 className="text-xl">
                    Total Price:{" "}
                    <span className="text-green-500">
                      {cartDetails?.totalCartPrice}
                    </span>{" "}
                    EGP
                  </h4>
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                      focus:ring-red-300 font-bold rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-red-600
                        dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => {
                      deleteCart();
                    }}
                  >
                    {" "}
                    clear All Items
                  </button>
                </div>
              </div>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails?.products?.map((product) => (
                      <tr
                        key={product.product.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={product.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updateProductQuantity(
                                  product.product.id,
                                  product.count - 1
                                )
                              }
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>{product.count}</div>
                            <button
                              onClick={() =>
                                updateProductQuantity(
                                  product.product.id,
                                  product.count + 1
                                )
                              }
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="mx-5 px-1 py-4 font-semibold text-green-800 dark:text-white">
                          {product.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              removeProductFromCart(product.product.id)
                            }
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {cartDetails ? (
                <Link
                  to={"/checkout"}
                  className="btn bg-green-500 w-full block my-10 text-center text-white text-xl"
                >
                  Checkout
                </Link>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
