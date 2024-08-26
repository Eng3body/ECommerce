/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import useFetch from "../../hooks/useFetch";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Categories() {
  const { data, isLoading, isError, error, isFetching } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    "Categories"
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : error ? (
        <div className="alert alert-error text-4xl text-center"> {error} </div>
      ) : (
        data && (
          <section className="py-24 text-center text-green-600">
            <h1 className="mb-10 text-3xl">Categories</h1>
            <div className="container mx-auto text-center text-green-600 flex flex-wrap justify-evenly gap-5">
              {data.data.data.map((category) => (
                <Link to={`/categoryDetails/${category._id}`} key={category._id}>
                  <div className="cursor-pointer">
                    <img
                      className="mb-4 w-[400px] h-[400px]"
                      src={category.image}
                      alt={category.name}
                    />
                    <h2 className="text-center text-green-600">
                      {category.name}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      )}
    </>
  );
}
