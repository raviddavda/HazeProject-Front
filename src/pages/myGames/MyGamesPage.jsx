import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import GameComponent from "../../components/GameComponent";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyGamesPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/games/my-games")
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((error) =>
        toast.error("Could not fetch games!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "fetch",
        })
      )
      .finally(() => {
        setLoad(true);
      });
  }, []);

  const handleEditGame = (_id) => {
    navigate(`${ROUTES.GAMEEDIT}/${_id}`);
  };

  const handleDeleteGame = async (_id) => {
    await axios
      .delete(`/games/${_id}`)
      .then((response) => {})
      .catch((error) => {
        toast.error("Only Admin or the game creator can do this!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "delete",
        });
      });
  };

  const handleFavGame = async (_id) => {
    await axios
      .patch(`/games/${_id}`)
      .then((response) => {})
      .catch((error) => {
        toast.error("Could not fetch games!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "fav",
        });
      });
  };

  return (
    <Box mb={8}>
      <Typography variant="h2" component="h2" color="primary" sx={{ mb: 2 }}>
        My Games
      </Typography>
      <Typography variant="h5" component="h5">
        Here are all the games you created.
      </Typography>
      <Divider sx={{ m: 2 }} />
      {load ? (
        <Grid
          container
          spacing={5}
          sx={{
            mb: 10,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {dataFromServer.length === 0 && (
            <Typography m={2} variant="h5">
              You have not created any games.
            </Typography>
          )}
          {dataFromServer.map((game) => (
            <Grid item xs={12} md={4} key={game._id}>
              <GameComponent
                _id={game._id}
                title={game.title}
                img={game.image.url}
                alt={game.image.alt}
                onDeleteGame={handleDeleteGame}
                onEditGame={handleEditGame}
                onFavGame={handleFavGame}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
      <Typography variant="h5">
        Click{" "}
        <Typography
          variant="h5"
          color="primary"
          component={NavLink}
          to={ROUTES.ADDGAME}
        >
          here
        </Typography>{" "}
        to create a game.
      </Typography>
    </Box>
  );
};

export default MyGamesPage;
