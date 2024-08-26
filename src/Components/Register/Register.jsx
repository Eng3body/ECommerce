/* eslint-disable no-unused-vars */ 
import React, { useEffect, useState ,useContext } from "react";
// import classes from "./Register.module.css"

import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'Yup'
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext"
import {Helmet} from "react-helmet";



export default function Register() {
  const {setAccessToken} =   useContext(AuthContext)
  const navigate=useNavigate()
  const [error,setError]=useState(null);
  const [isLoading,setIsLoading]=useState(null);

  const initialValue = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  
  const validationSchema = Yup.object().shape({
    name : Yup.string().min(3).max(20).required('Name is Required'),
    email : Yup.string().email().required('Email is Required'),
    phone:  Yup.string().matches(/^(002)?01[0125][0-9]{8}$/i,'Phone number must be like (002)01[0125]xxxxxxxx').required('Phone Number is Required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,16}$/i,"Password Must Start With Capital Letter and At least 5").required("Password is Required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")], "Password and rePassword Must be Equal").required("rePassword is Required")
  
  
  })

  const formik = useFormik({
    initialValues: initialValue,
    // validate:validateForm,
    validationSchema : validationSchema,
    onSubmit: handleRegister,
  });

    
  function validateForm(values){
    const errors = {}

    // Name 
    if(values.name === ""){
      errors.name= "Name is Required " 
    }else if(values.name.length <=3 ){
        errors.name = "Length of the name must be at least 3 Chars"
    }else if(values.name.length >=30 ){
      errors.name = "Length of the name must be at Maximum 30  Chars"
  }

  // Email 
  if(!values.email){
    errors.email = "Email is Required";
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email = "Invalid Email";
  }

  // Phone 
  
    if(!values.phone){
      errors.phone = "Phone is Required";
      }else if(!/^(002)?01[0125][0-9]{8}$/i.test(values.email)){
      errors.phone = "Invalid Phone Number";
    
    }


  // Password

  if(values.password === ""){
    errors.password= "Password  is Required " 
  }else if(values.password.length <=3 ){
      errors.password = "Length of the Password must be at least  Chars"
  }else if(values.password.length >=15 ){
    errors.password = "Length of the Password must be at Maximum 15 Chars"
  }else if(!/^[A-Z][a-z0-9_]$/i.test(values.password)){
    errors.password = "Password Must be Start With Capital letter ";
  }


    // rePassword

  if(values.rePassword === ""){
      errors.rePassword= "rePassword  is Required " 
    }else if (values.rePassword !== values.password){
      errors.rePassword = "Password and rePassword Must be Equal" ;
    }




    return errors
  }

  async function handleRegister(values) {
    console.log("values", values);
    setIsLoading(true)
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message === 'success'){
        setAccessToken(data.token)
        navigate("/login")
      }
    } catch (e) {
      setError(e.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        
      </Helmet>
      <div className="max-w-xl mx-auto mt-20 text-center  text-green-600">
        
        <h1 className="text-4xl font-bold mb-5 ">Register</h1>
      </div>
      {error && <div className="alert alert-error max-w-xl mx-auto m-3">{error}</div> }
      <form
        onSubmit={formik.handleSubmit}
        className="w-10/12 lg:max-w-xl mx-auto mb-32 "
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none dark:text-white dark:border-gray-600
              dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600
              peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
          {formik.errors.name && formik.touched.name && (<span className="text-red-600">{formik.errors.name}</span>)}
        </div>
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
          {formik.errors.email && formik.touched.email && (<span className="text-red-600">{formik.errors.email}</span>)}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}

          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600
              peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Password
          </label>
          {formik.errors.password && formik.touched.password && (<span className="text-red-600">{formik.errors.password}</span>)}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="repassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            value={formik.values.rePassword}
          />
          <label
            htmlFor="repassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600
              peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword && (<span className="text-red-600">{formik.errors.rePassword}</span>)}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="phone"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}

          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600
              peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter phone Number
          </label>
          {formik.errors.phone && formik.touched.phone && (<span className="text-red-600">{formik.errors.phone}</span>)}
        </div>

       
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
         dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
          {  isLoading ? <i className="fas fa-spinner fa-spin" ></i> : "Register"}
          
        </button>
      </form>
    </>
  );
}
