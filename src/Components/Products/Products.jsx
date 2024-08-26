/* eslint-disable no-unused-vars */
// import React, { useEffect } from 'react'
// import classes from "./Products.module.css"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import useFetch from "../../hooks/useFetch";
import { Helmet } from "react-helmet";

export default function Products() {
  const { data, isLoading, isError, error, isFetching } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/products`,
    "Products"
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        
      </Helmet>
      <section className="py-24">
        <div className="container mx-auto  text-center text-green-600  ">
          <h1 className="mb-10 text-5xl">All Products</h1>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-screen">
              <Loader />
            </div>
          ) : error ? (
            <div className="alert alert-error text-4xl text-center ">
              {" "}
              {error}{" "}
            </div>
          ) : (
            <div className="row ">
              {data?.data.data.map((product) => (
                <>
                  <Product key={product.id} product={product} />
                </>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
