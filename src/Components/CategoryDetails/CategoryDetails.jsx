/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import Product from '../Product/Product';

export default function CategoryDetails() {
  const { id } = useParams();


  const { data, isError, isLoading, error } = useFetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, "Category Details");


  console.log('Category details:', data?.data?.data);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }


  if (isError || !data) {
    return (
      <div className="alert alert-error text-4xl text-center">
        {error || "Error fetching data"}
      </div>
    );
  }


  const categoryDetails = data?.data?.data; 

  return (
    <>
      <Helmet>
        <title>{categoryDetails?.name || 'Category Details'}</title>
      </Helmet>
      <section className="py-24">
        <div className="container mx-auto text-center text-green-600">
          <h1 className="mb-10 text-5xl">{categoryDetails?.name} Category</h1>
          <div className="row flex justify-evenly align-middle">
          <img src={categoryDetails?.image} alt={categoryDetails?.name} className="mb-4 w-[400px] h-[400px]" />
          <p className="text-xl">{categoryDetails?.name}</p>
          
          </div>
        </div>
      </section>
    </>
  );
}
