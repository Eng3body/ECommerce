/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
// import classes from "./checkout.module.css"

import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "Yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const { accessToken } = useContext(AuthContext);
  const { getPayment, clearCartItems } = useContext(CartContext);

  const { cartID } = useContext(CartContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  const initialValue = {
    details: "",
    phone: "",
    city: "",
  };

  const formik = useFormik({
    initialValues: initialValue,
    // validate:validateForm,
    // validationSchema : validationSchema,
    onSubmit: handleCheckout,
  });

  async function handleCheckout(values) {
    try {
      const url = isOnline
        ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173`
        : `https://ecommerce.routemisir.com/api/v1/orders/${cartID}`;

      const res = await getPayment(url, values);
      // console.log("Date", res);
      // console.log("values", values);

      if (res.status === "success") {
        console.log("Date", res);

        if (isOnline) {
          window.location.href = res.session.url;
        } else {
          // console.log(res.session.url)
          toast.success("Payment done Successfully");
          setTimeout(() => {
            navigate("/allorders");
          }, 5000);
        }

        // clearCartItems();
      } else {
        toast.error("Something went wrong");
        console.log("Error", res);
      }
    } catch (err) {
      setError(
        "An error occurred while processing your payment. Please try again."
      );
      toast.error("An error occurred");
      console.error("Error", err);
    } finally {
      //
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout</title>
      </Helmet>

      <div className="max-w-xl mx-auto mt-24 text-center  text-green-600">
        <h1 className="text-4xl font-bold mb-5 ">Shipping Details</h1>
      </div>
      {error && (
        <div className="alert alert-error max-w-xl mx-auto m-3">{error}</div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="w-10/12 lg:max-w-xl mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600
              peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600
              peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Details
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.city}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600
              peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your city
          </label>
        </div>

        <div className="w-full">
          {" "}
          <input
            type="checkbox"
            name=""
            id="isOnline"
            className="m-2"
            onChange={() => setIsOnline(!isOnline)}
          />
          <label htmlFor="isOnline" className="m-2">
            Is Pay Online
          </label>
        </div>
        <br />
          <button
            type="submit"
            className="pay btn mb-20 text-white bg-green-700 hover:bg-green-800 focus:ring-4 
          focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm
          w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600
        dark:hover:bg-green-700 dark:focus:ring-green-800 "
          >
            {isOnline ? "Payment Online" : "Pay Cash"}
          </button>
        
      </form>
    </>
  );
}
