import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const AdminGuard = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  if (userData && userData.isAdmin) {
    return children;
  } else {
    toast.error("Accesable only by Admin Account", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: localStorage.getItem("darkMode") ? "dark" : "light",
      toastId: "admin",
    });
    return <Navigate to={ROUTES.HOME} replace={true} />;
  }
};

export default AdminGuard;
