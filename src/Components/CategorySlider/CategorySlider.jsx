/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import classes from "./CategorySlider.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };
  async function getCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );

      console.log(data.data);
      setCategories(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // mount phase
    getCategories();
  }, []);

  return (
    <>
      <section className="py-24">
        <div className="container mx-auto text-center text-green-600 ">
          <h1 className="mb-10 text-3xl">Categories</h1>
          <Slider {...settings}>
            {categories.map((category) => (
              <Link to={`/categoryDetails/${category._id}`} key={category.id} >
                <img className="mb-4 w-[400px] h-[400px]" src={category.image}></img>
                <h2 className="text-center text-green-600">{category.name}</h2>
              </Link>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}
