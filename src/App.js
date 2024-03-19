import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LayoutComponent from "./layout/LayoutComponent";
import { ToastContainer, toast } from "react-toastify";
import Router from "./routes/Router";
import useAutoLogin from "./hooks/useAutoLogin";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

const App = () => {
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();
  useEffect(() => {
    (async () => {
      try {
        await autoLogin();
      } catch (err) {
        toast.error("Could not authenticate Login!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "login",
        });
      } finally {
        setDoneAuth(true);
      }
    })();
  }, []);
  return (
    <LayoutComponent>
      <ToastContainer />
      {doneAuth ? <Router /> : <LinearProgress />}
    </LayoutComponent>
  );
};

export default App;
