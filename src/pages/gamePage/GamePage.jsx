import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import toastMessage from "../../components/toastMessage";
import { useSelector } from "react-redux";
import homePageNormalization from "../home/HomePageNormalize";

const GamePage = () => {
  const [dataFromServer, setDataFromServer] = useState("");
  const [games, setGames] = useState([]);
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get(`/users/${userData?._id}`)
        .then(({ data }) => {
          setUser(data.rest);
        })
        .catch((error) => {
          toast.error("Server error", { toastId: "err" });
        });
    };
    getUserData();
  }, [userData]);

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

  useEffect(() => {
    axios
      .get(`/games/${id}`)
      .then(({ data }) => {
        setDataFromServer(data);
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

  const handleDeleteGame = async () => {
    await axios
      .delete(`/games/${id}`)
      .then((response) => {
        toastMessage("Game deleted successfully", "gameDelete");
        navigate(ROUTES.HOME);
      })
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

  const handleFavGame = async () => {
    await axios
      .patch(`/games/${id}`)
      .then(({ data }) => {})
      .catch((error) => {
        toast.error("Log in to add to Wishlist!", {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      {dataFromServer ? (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "10%",
              mb: 2,
              p: 1,
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <img
                style={{
                  width: "100%",
                  borderRadius: "5px",
                }}
                src={dataFromServer.image.url}
                alt={dataFromServer.image.alt}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "column" },
              }}
            >
              <Typography color="primary" variant="h2" component="h2" mb={2}>
                {dataFromServer.title}
              </Typography>
              <Typography variant="h6">
                Category: <Typography>{dataFromServer.category}</Typography>
              </Typography>
              <Typography variant="h6">
                Date Created:{" "}
                <Typography>{dataFromServer.createdAt}</Typography>
              </Typography>
            </Box>
          </Box>
          {games.filter((game) => game.likes).length ? (
            games
              .filter((game) => game.likes)
              .map((game) => (
                <Button
                  sx={{ mb: 2 }}
                  variant="outlined"
                  onClick={handleFavGame}
                >
                  Wishlisted
                </Button>
              ))
          ) : (
            <Button sx={{ mb: 2 }} variant="contained" onClick={handleFavGame}>
              Add to wishlist
            </Button>
          )}
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              p: 1,
            }}
          >
            <Typography variant="h6">
              Description: <Typography>{dataFromServer.description}</Typography>
            </Typography>
            <Typography variant="h6">
              Game ID: <Typography>{dataFromServer._id}</Typography>
            </Typography>
            <Typography variant="h6">
              Email:{" "}
              <Typography>
                {dataFromServer.email ? dataFromServer.email : user.email}
              </Typography>
            </Typography>
            <Typography variant="h6">
              Created By:{" "}
              <Typography>
                {user && user.name.first} {user && user.name.last}
              </Typography>
            </Typography>
          </Box>
          {userData._id === dataFromServer.userId && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Button
                sx={{ mb: 1, mr: 1 }}
                component={Link}
                to={`${ROUTES.GAMEEDIT}/${id}`}
                variant="contained"
              >
                Edit game details
              </Button>
              <Button
                sx={{ mb: 1, mr: 1 }}
                color="error"
                variant="contained"
                onClick={handleClickOpen}
              >
                Delete game
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete Game?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This cannot be undone, are you sure you want to delete this
                    game?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    CANCEL
                  </Button>
                  <Button color="error" onClick={handleDeleteGame}>
                    DELETE
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default GamePage;
