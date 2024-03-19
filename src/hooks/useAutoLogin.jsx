import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { getToken } from "../service/storageService";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  return async (skipTokenTest = false) => {
    try {
      const token = getToken();
      if (!token) return;
      const dataFromToken = jwtDecode(token);
      if (skipTokenTest) await axios.get(`/users/${dataFromToken._id}`);
      dispatch(authActions.login(dataFromToken));
    } catch (error) {
      localStorage.removeItem("token");
    }
  };
};

export default useAutoLogin;
