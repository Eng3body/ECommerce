/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect , useState , useContext} from 'react'
import classes from "./MyOrders.module.css"
import axios from 'axios';
import { CartContext } from "../../Context/CartContext";


export default function MyOrders() {

  //https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17

  const { userID } = useContext(CartContext);
  console.log("userId" , userID);
  
  const [orders, setOrders] = useState([]); 
  
  async function getMyOrders() {
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
      console.log("Orders Data", data)
      // setOrders(data);
      
    } catch (error) {
      console.log("My orders error",error);
      
    }
  }


  useEffect(() => {
    userID && getMyOrders();
  }, [userID]);

  
  return (
    <>
      
    </>
  )
}
