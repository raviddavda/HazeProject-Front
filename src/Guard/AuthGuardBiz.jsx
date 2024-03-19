import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AuthGuardBiz = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  if (userData && userData.isBusiness) {
    return children;
  } else {
    toast.error("Only a Business Account can do that!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: localStorage.getItem("darkMode") ? "dark" : "light",
      toastId: "business",
    });
    return <Navigate to={ROUTES.HOME} replace={true} />;
  }
};

export default AuthGuardBiz;
