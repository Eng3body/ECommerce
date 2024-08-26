/* eslint-disable no-unused-vars */
import React, { Profiler, useEffect, useState } from "react";
import classes from "./RecentProducts.module.css";
import axios from "axios";
import { data } from "autoprefixer";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";


export default function RecentProducts() {

  const {data , isLoading , isError, error , isFetching} = useFetch(`https://ecommerce.routemisr.com/api/v1/products` , "recent-products")
  


  return (
    <>
      <section className="py-24">
        <div className="container mx-auto  text-center text-green-600  ">
        <h1 className="mb-10 text-3xl">Recent Products</h1>

        {
        isLoading ? <Loader/> : 
        
        error ? <div className='alert alert-error text-4xl text-center '> {error} </div> : 


          <div className="row" >
            {data?.data.data.map((product, index) => (
                <>
                <Product key={product.id} product={product}/>
                </>
              ) )
            }

          </div>}
        </div>
      </section>
    </>
  );
}
