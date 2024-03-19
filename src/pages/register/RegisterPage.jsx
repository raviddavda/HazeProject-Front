import { useState } from "react";
import {
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { validateRegister } from "../../validations/registerValidation";
import inputsData from "./inputsData";
import normalizeData from "./normalizeData";
import ContainerComp from "../../components/ContainerComp";
import FieldTextComp from "../../components/FieldTextComp";

const RegisterPage = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errorsState, setErrorsState] = useState(false);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const inputData = normalizeData(inputsValue, checked);
      const joiResponse = validateRegister(inputData);
      setErrorsState(joiResponse);
      if (joiResponse) return;

      const request = normalizeData(inputsValue, checked);

      await axios.post("/users", request);
      toast.success("Welcome, Please log in", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: localStorage.getItem("darkMode") ? "dark" : "light",
        toastId: "register",
      });
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: localStorage.getItem("darkMode") ? "dark" : "light",
        toastId: "login",
      });
    }
  };

  return (
    <ContainerComp>
      <Typography component="h2" variant="h2" color="primary">
        Sign up
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {inputsData.map((input, index) => (
            <FieldTextComp
              isError={Boolean(errorsState[input.value])}
              helperText={errorsState[input.value]}
              key={index}
              id={input.id}
              label={input.label}
              required={input.required}
              type={input.type}
              value={inputsValue[input.value]}
              onChange={handleInputChange}
            />
          ))}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="isBusiness"
                  color="primary"
                  checked={checked}
                  onChange={handleChange}
                />
              }
              label="Business Account"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Link component={NavLink} to={ROUTES.LOGIN}>
          Already have an account? Sign in
        </Link>
      </Box>
    </ContainerComp>
  );
};

export default RegisterPage;
