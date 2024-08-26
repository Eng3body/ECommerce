/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import classes from "./Home.module.css";

import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}
