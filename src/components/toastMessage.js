import { toast } from "react-toastify";

const toastMessage = (message, toastId) => {
  return toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    pauseOnFocusLoss: false,
    theme: localStorage.getItem("darkMode") ? "dark" : "light",
    toastId: toastId,
  });
};

export default toastMessage;
