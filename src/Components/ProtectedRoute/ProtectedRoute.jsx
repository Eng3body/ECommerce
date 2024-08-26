/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {


  if(!localStorage.getItem("accessToken")){
    return<Navigate to={'/login'}/>
  }

  return children
}
