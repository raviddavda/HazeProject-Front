import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import ContainerComp from "../../components/ContainerComp";
import FieldTextComp from "../../components/FieldTextComp";
import inputData from "./inputData";
import normalizeGameData from "./normalizeGameData";
import { validateGame } from "../../validations/gameValidation";
import { toast } from "react-toastify";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const AddGamePage = () => {
  const [inputsValue, setInputValue] = useState({
    title: "",
    description: "",
    category: "",
    email: "",
    url: "",
    alt: "",
  });
  const [errorsState, setErrorsState] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    setInputValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateChangesClick = async () => {
    try {
      // normalizeGameData needs to be synced with joi
      const inputData = normalizeGameData(inputsValue);
      const joiResponse = validateGame(inputData);
      setErrorsState(joiResponse);
      if (joiResponse) return;

      const request = normalizeGameData(inputsValue);

      await axios.post("/games", request);
      toast.success("Added a new game!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: localStorage.getItem("darkMode") ? "dark" : "light",
        toastId: "gamecreate",
      });
      navigate(ROUTES.MYGAMES);
    } catch (err) {
      toast.error("Server Error", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: localStorage.getItem("darkMode") ? "dark" : "light",
        toastId: "createGame",
      });
    }
  };

  return (
    <ContainerComp>
      <Typography variant="h2" component="h2" color="primary">
        Add A New Game
      </Typography>
      <Typography variant="h5" component="h5">
        Here you can add new games, and they will be added to the Home page.
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Grid container spacing={2}>
        {inputData.map((input, index) => (
          <FieldTextComp
            isError={Boolean(errorsState[input.value])}
            helperText={errorsState[input.value]}
            key={index}
            id={input.id}
            label={input.label}
            required={input.required}
            value={inputsValue[input.value]}
            onChange={handleInputChange}
          />
        ))}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              id="category"
              name="category"
              value={inputsValue.category}
              label="Category"
              onChange={handleInputChange}
            >
              <MenuItem value={"Action"}>Action</MenuItem>
              <MenuItem value={"Adventure"}>Adventure</MenuItem>
              <MenuItem value={"RPG"}>RPG</MenuItem>
              <MenuItem value={"Shooter"}>FPS Shooter</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleUpdateChangesClick}
      >
        Add new game
      </Button>
    </ContainerComp>
  );
};
export default AddGamePage;
