import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((store) => {
    if(store.LoginStore.loginData.token) return true

    return false;
  });

  if(!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
