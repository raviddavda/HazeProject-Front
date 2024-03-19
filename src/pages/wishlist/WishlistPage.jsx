import { Divider, Grid, Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import homePageNormalization from "../home/HomePageNormalize";
import GameComponent from "../../components/GameComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const WishlistPage = () => {
  const [games, setGames] = useState([]);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/games")
      .then(({ data }) => {
        homePageNormalization(data.allGames, userData._id);
        setGames(data.allGames);
      })
      .catch((error) => {
        toast.error("Could not fetch games!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "gamePage",
        });
      });
  }, [userData._id]);

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
    <Box>
      <Typography variant="h2" component="h2" color="primary">
        Wishlist
      </Typography>
      <Typography variant="h5" component="h5">
        Here will be displayed all the games you have wishlisted.
      </Typography>
      <Divider sx={{ m: 2 }} />
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
        {games.filter((game) => game.likes).length ? (
          games
            .filter((game) => game.likes)
            .map((game) => (
              <Grid item xs={12} md={4} key={game._id}>
                <GameComponent
                  _id={game._id}
                  title={game.title}
                  img={game.image.url}
                  alt={game.image.alt}
                  like={game.likes}
                  onFavGame={handleFavGame}
                />
              </Grid>
            ))
        ) : (
          <Typography m={2} variant="h5">
            Your Wishlist is empty, Press the <FavoriteIcon color="heart" />{" "}
            icon to wishlist a game.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default WishlistPage;
