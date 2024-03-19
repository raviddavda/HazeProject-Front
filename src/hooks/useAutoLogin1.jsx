import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  return async (skipTokenTest = false) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const dataFromToken = jwtDecode(token);
      if (skipTokenTest) await axios.get(`/users/${dataFromToken._id}`);
      dispatch(authActions.login(dataFromToken));
    } catch (err) {
      localStorage.clear();
    }
  };
};

export default useAutoLogin;
