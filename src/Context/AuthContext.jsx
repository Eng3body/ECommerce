/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext , useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext(null);

export default function AuthContextProvider({children}) {
  const [accessToken, setAccessToken] = useState(null);
  const [token, setToken] = useState(null);
  // console.log(accessToken);
  
  useEffect(()=> { 
    // Mount Phase
    const token = localStorage.getItem("accessToken");
    if(token){
      setToken(token)
      const decoded = jwtDecode(token);
      setAccessToken(token);
      
    }
  }, [])
 


  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
