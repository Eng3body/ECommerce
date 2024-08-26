/* eslint-disable no-unused-vars */
import React, { Profiler, useEffect, useState, useContext } from "react";
// import classes from "./productDetails.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => GetProductDetails(),
    select: (data) => data.data.data,
  });

  async function GetProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function addProductToCart(productId) {
    const res = await addToCart(productId);
    console.log(res);
    if (res.status == "success") {
      toast.success(res.message, {
        position: "top-center",
      });
    } else {
      toast.fail("Failed Add To Cart", {
        position: "top-center",
        theme: "dark",
      });
    }
  }

  return (
    <>
      <section className="py-24">
        <div className="container mx-auto text-center  text-green-600 ">
          <h1 className="mb-10 ">Product Details</h1>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error text-4xl text-center">
              {" "}
              {error}{" "}
            </div>
          ) : (
            <div className="row">
              <div className="w-1/3">
                {/* <img src={data.data.data.imageCover} alt=""></img> */}
                <Slider {...settings}>
                  {data?.images?.map((imageSrc, index) => (
                    <img key={index} src={imageSrc} alt={data.title}></img>
                  ))}
                </Slider>
              </div>
              <div className="px-20 w-2/3 flex-col flex justify-center">
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>{data.title}</title>
                </Helmet>
                <h1 className="text-2xl mb-4 font-bold text-green-500 ">
                  {" "}
                  {data.title}
                </h1>
                <p className="mb-4 text-lg "> {data.description} </p>

                <div className="flex  justify-between text-gray-500  text-lg mb-4">
                  <p>{data?.category?.name} </p>
                  <span>{data.price} EGP</span>

                  <div>
                    <i className="fas fa-star text-yellow-500  me-2"></i>
                    <span>{data.ratingsAverage}</span>
                  </div>
                </div>
                <button
                  onClick={() => addProductToCart(data.id)}
                  className="mt-10 btn border-2 border-green-500 w-full bg-green-500 text-white text-2xl"
                >
                  {" "}
                  Add To Cart{" "}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <RelatedProducts />
    </>
  );
}
