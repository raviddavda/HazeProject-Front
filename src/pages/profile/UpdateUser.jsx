import { useEffect, useState } from "react";
import { Button, Grid, Box, Typography, Divider } from "@mui/material";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { validateUserUpdate } from "../../validations/updateUserValidation";
import normalizeData from "./normalizeData";
import inputsData from "../register/inputsData";
import ContainerComp from "../../components/ContainerComp";
import FieldTextComp from "../../components/FieldTextComp";
import normalizeDataFromServer from "./normalizeDataFromServer";

const RegisterPage = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    phone: "",
    email: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isBusiness: "",
  });
  const [errorsState, setErrorsState] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleInputChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  //get user details
  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then(({ data }) => {
        setInputsValue(normalizeDataFromServer(data.rest));
      })
      .catch((error) => {
        toast.error("Could not fetch account!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "profile",
        });
      });
  }, [id]);

  const handleSubmit = async (event) => {
    try {
      const inputData = normalizeData(inputsValue);
      const joiResponse = validateUserUpdate(inputData);
      setErrorsState(joiResponse);
      if (joiResponse) return;

      const request = normalizeData(inputsValue);

      await axios.put(`/users/${id}`, request);
      toast.success("Details Updated!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: localStorage.getItem("darkMode") ? "dark" : "light",
        toastId: "userupd",
      });
      navigate(`${ROUTES.PROFILE}/${id}`);
    } catch (err) {
      toast.error("Could not update details!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: localStorage.getItem("darkMode") ? "dark" : "light",
        toastId: "userUpdate",
      });
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <ContainerComp>
      <Typography component="h2" variant="h2" color="primary">
        Edit user settings
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Grid container spacing={2}>
        {inputsData.map((input, index) => (
          <FieldTextComp
            isError={Boolean(errorsState[input.value])}
            helperText={errorsState[input.value]}
            key={index}
            id={input.id}
            label={input.label}
            type={input.type}
            required={input.required}
            value={inputsValue[input.value]}
            onChange={handleInputChange}
          />
        ))}
      </Grid>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Update user settings
        </Button>
        <Button
          type="submit"
          color="error"
          variant="contained"
          onClick={handleCancel}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </ContainerComp>
  );
};

export default RegisterPage;
