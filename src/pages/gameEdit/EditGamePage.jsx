import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ContainerComp from "../../components/ContainerComp";
import ROUTES from "../../routes/ROUTES";
import inputData from "./inputData";
import { toast } from "react-toastify";
import { validateGame } from "../../validations/gameValidation";
import FieldTextComp from "../../components/FieldTextComp";
import normalizeGameData from "./normalizeGameData";
import normalizeGameDataFromServer from "./normalizeGameDataFromServer";

const EditGamePage = () => {
  const [inputsValue, setInputValue] = useState({
    title: "",
    description: "",
    email: "",
    category: "",
    url: "",
    alt: "",
  });
  const [errorsState, setErrorsState] = useState({});
  const { id } = useParams();
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

  useEffect(() => {
    axios
      .get(`/games/${id}`)
      .then(({ data }) => {
        setInputValue(normalizeGameDataFromServer(data));
      })
      .catch((error) =>
        toast.error("Could not fetch game!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "game",
        })
      );
  }, [id]);

  const handleUpdateChangesClick = async () => {
    try {
      const inputData = normalizeGameData(inputsValue);
      const joiResponse = validateGame(inputData);
      setErrorsState(joiResponse);
      if (joiResponse) return;

      const request = normalizeGameData(inputsValue);

      await axios.put(`/games/${id}`, request);
      toast.success("Game updated successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: localStorage.getItem("darkMode") ? "dark" : "light",
        toastId: "gameupd",
      });
      navigate(ROUTES.MYGAMES);
    } catch (err) {
      toast.error("Only Admin or the game creator can do this!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: localStorage.getItem("darkMode") ? "dark" : "light",
        toastId: "editgame",
      });
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <ContainerComp>
      <Typography component="h2" variant="h2" color="primary">
        Edit Game Details
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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          type="submit"
          color="error"
          variant="contained"
          onClick={handleCancel}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleUpdateChangesClick}
          sx={{ mt: 2 }}
        >
          Update Game Details
        </Button>
      </Box>
    </ContainerComp>
  );
};
export default EditGamePage;
