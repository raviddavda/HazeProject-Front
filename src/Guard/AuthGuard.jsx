import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const AuthGuard = ({ children }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  if (loggedIn) {
    return children;
  } else {
    toast.error("Please log in", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: localStorage.getItem("darkMode") ? "dark" : "light",
      toastId: "guard",
    });
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
};

export default AuthGuard;
