/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
// import classes from "./Layout.module.css"
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
