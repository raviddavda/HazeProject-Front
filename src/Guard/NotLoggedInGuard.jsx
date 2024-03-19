import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const NotLoggedInGuard = ({ children }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  if (!loggedIn) {
    return children;
  } else {
    toast.error("You are already logged in!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: localStorage.getItem("darkMode") ? "dark" : "light",
      toastId: "guard",
    });
    return <Navigate to={ROUTES.HOME} replace={true} />;
  }
};

export default NotLoggedInGuard;
