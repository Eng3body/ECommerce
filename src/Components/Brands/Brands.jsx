/* eslint-disable no-unused-vars */
// import React, { useEffect } from 'react'
// import classes from "./Products.module.css"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import useFetch from "../../hooks/useFetch";
import { Helmet } from "react-helmet";


export default function Categories() {
  const { data, isLoading, isError, error, isFetching } =useFetch(`https://ecommerce.routemisr.com/api/v1/brands` , "Brands")
  

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        
      </Helmet>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
      ) : error ? (
        <div className="alert alert-error text-4xl text-center "> {error} </div>
      ) : (
        data && (
          <section className="py-24 text-center  text-green-600 ">
            <h1 className="mb-10 text-3xl">Brands</h1>
            <div className="container mx-auto text-center text-green-600 flex flex-wrap justify-evenly gap-5">
              {data.data.data.map((category) => (
                <div key={category.id} className="">
                  <img
                    className="mb-4 w-[300px] h-[300px]"
                    src={category.image}
                  ></img>
                  <h2 className="text-center text-green-600">
                    {category.name}
                  </h2>
                </div>
              ))}
            </div>
          </section>
        )
      )}
    </>
  );
}
