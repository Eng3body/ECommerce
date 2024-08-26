/* eslint-disable no-unused-vars */
import React, { Profiler, useEffect, useState } from "react";

import axios from "axios";
import { data } from "autoprefixer";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import { useParams } from "react-router-dom";

export default function RelatedProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();

  async function getRelatedProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const res = data.data.filter(
        (product) => product.category.name == category
      );
      // console.log(data.data);
      setProducts(res);
      // console.log(res);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // mount phase
    getRelatedProducts();
  }, []);



  return (
    <>
      <section className="py-24">
        <div className="container mx-auto ">
          <h1>Related Products</h1>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error text-4xl text-center ">
              {error}
            </div>
          ) : (
            <div className="row">
              {products.map((product) => (
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
