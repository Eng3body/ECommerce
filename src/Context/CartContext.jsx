/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { accessToken } = useContext(AuthContext);
  const endPoint = `https://ecommerce.routemisr.com/api/v1/cart`;
  const headers = {
    token: accessToken,
  };

  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartID, setCartID] = useState(null);
  const [userID, setUserID] = useState(null);

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(endPoint, { productId }, { headers });
      // console.log(data);
      setNumOfCartItems(data?.numOfCartItems);
      setCartID(data?.data._id);
      setUserID(data?.data.cartOwner);

      return data;
    } catch (error) {
      // console.error(error);
      return error.response.data.messages;
    }
  }

  async function getCart() {
    try {
      const { data } = await axios.get(endPoint, { headers });
      // console.log("Cart", data);
      setNumOfCartItems(data?.numOfCartItems);
      setCartDetails(data?.data);
      setCartID(data?.data._id);
      console.log("Cart Owner",data?.data?.cartOwner);
      
      setUserID(data?.data.cartOwner)

      return data;
    } catch (error) {
      console.error(error);
      return error.response.data.messages;
    }
  }

  async function removeFromCart(productId) {
    try {
      const { data } = await axios.delete(`${endPoint}/${productId}`, {
        headers,
      });
      // console.log(data);
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartID(data.data._id);
      setUserID(data.data.cartOwner);

      return data;
    } catch (error) {
      // console.error(error);
      return error.response.data.messages;
    }
  }

  async function clearCartItems() {
    try {
      const { data } = await axios.delete(`${endPoint}`, {
        headers,
      });
      // console.log(data);
      setNumOfCartItems(0);
      setCartDetails(null);
      setCartID(null);

      return data;
    } catch (error) {
      // console.error(error);
      return error.response.data.messages;
    }
  }

  async function updateQuantity(productId, count) {
    try {
      const { data } = await axios.put(
        `${endPoint}/${productId}`,
        { count },
        { headers }
      );
      // console.log(data);
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartID(data.data._id);
      setUserID(data.data.cartOwner);

      return data;
    } catch (error) {
      // console.error(error);
      return error.response.data.messages;
    }
  }

  async function getPayment(url, shippingAddress) {
    try {
      const { data } = await axios.post(url, { shippingAddress }, { headers });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return error.response.data.messages;
    }
  }

  useEffect(() => {
    // console.log(accessToken);

    accessToken && getCart();
  }, [accessToken, userID]);

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        addToCart,
        getCart,
        cartDetails,
        removeFromCart,
        updateQuantity,
        getPayment,
        cartID,
        clearCartItems,
        userID,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
