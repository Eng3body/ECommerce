/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

// Create WishlistContext
export const WishlistContext = createContext();

// WishlistContextProvider component
export default function WishlistContextProvider({ children }) {
  const { accessToken } = useContext(AuthContext);
  const endPoint = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const headers = {
    token: accessToken,
  };

  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [wishlistID, setWishlistID] = useState(null);
  // const [userID, setUserID] = useState(null);

  // Function to add a product to the wishlist
  async function addToWishlist(productId) {
    if (!accessToken) {
      return { status: 'fail', message: 'User not authenticated' };
    }
    try {
      const { data } = await axios.post(endPoint, { productId }, { headers });
      // setUserID(data.data.wishlistOwner); // Correct the property name
      setNumOfWishlistItems(data.data.length); 

      console.log("wishlist Data")
      if(data){
        return data;}
        else{
          return null;
        }
    } catch (error) {
      console.error(error);
      return { status: 'fail', message: 'Failed to add to wishlist' };
    }
  }

  // Function to fetch wishlist details
  async function getWishlist() {
    if (!accessToken) {
      return { status: 'fail', message: 'User not authenticated' };
    }
    try {
      const { data } = await axios.get(endPoint, { headers });
      setWishlistDetails(data.data);
      console.log(data)
      setNumOfWishlistItems(data.data.length);  
      // setUserID(data.data.wishlistOwner); // Correct the property name
      setWishlistID(data.data._id);
      if(data){
      return data;}
      else{
        return null;
      }
    } catch (error) {
      console.error(error);
      return { status: 'fail', message: 'Failed to fetch wishlist' };
    }
  }

  // Function to remove a product from the wishlist
  async function removeFromWishlist(productId) {
    if (!accessToken) {
      return { status: 'fail', message: 'User not authenticated' };
    }
    try {
      const { data } = await axios.delete(`${endPoint}/${productId}`, {
        headers,
      });
      setNumOfWishlistItems(data.data.length); 


   
      // setWishlistID(data.data._id);
      // setUserID(data.data.wishlistOwner); // Correct the property name
      if(data){
        return data;}
        else{
          return null;
        }
    } catch (error) {
      console.error(error);
      return { status: 'fail', message: 'Failed to remove from wishlist' };
    }
  }



  // Fetch wishlist on accessToken change
  useEffect(() => {
    if (accessToken) {
      getWishlist();
    }
  }, [accessToken]);

  return (
    <WishlistContext.Provider
      value={{
        numOfWishlistItems,
        addToWishlist,
        getWishlist,
        wishlistDetails,
        removeFromWishlist,
        wishlistID,
        // userID,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
