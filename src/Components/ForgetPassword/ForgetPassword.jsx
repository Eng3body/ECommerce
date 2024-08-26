/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const initialValue = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: handleForgetPassword,
  });

  async function handleForgetPassword(values) {
    console.log("values", values);
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", // Corrected endpoint
        values
      );
      if (data.message === "success") {
        // setAccessToken(data.token); // Optional, depending on API behavior
        // localStorage.setItem("accessToken", data.token); // Optional, depending on API behavior
        navigate("/login");
      }
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
      </Helmet>
      <div className="max-w-xl mx-auto mt-24">
        <h1 className="text-4xl font-bold mb-5">Forget Password</h1>
      </div>
      {error && (
        <div className="alert alert-error max-w-xl mx-auto m-3">{error}</div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="w-10/12 lg:max-w-xl mx-auto mb-60"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none dark:text-white dark:border-gray-600
              dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600
              peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email && (
            <span className="text-red-600">{formik.errors.email}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
        dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Reset Password"}
        </button>
      </form>
    </>
  );
}
