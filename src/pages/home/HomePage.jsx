import { Divider, Grid, Pagination, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import GameComponent from "../../components/GameComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import useQueryParams from "../../hooks/useQueryParams";
import { useSelector } from "react-redux";
import homePageNormalization from "./HomePageNormalize";
import { toast } from "react-toastify";
import toastMessage from "../../components/toastMessage";

let initDataFromServer = [];

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  const itemsPerPage = 3;

  //get all games
  useEffect(() => {
    axios
      .get("/games")
      .then(({ data }) => {
        setDataFromServer(data.allGames);
        setTotalPages(Math.ceil(data.allGames.length / itemsPerPage));
      })
      .catch((error) => {
        toast.error("Could not fetch games!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") ? "dark" : "light",
          toastId: "games",
        });
      });
  }, [userData]);

  //pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = dataFromServer.slice(startIndex, endIndex).reverse();

  const handlePageChange = (event, selectedPage) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    if (!initDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    setDataFromServer(
      initDataFromServer.filter((game) => game.title.startsWith(filter))
    );
  }, [query]);

  const handleFavGame = async (_id) => {
    await axios
      .patch(`/games/${_id}`)
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

  return (
    <Fragment>
      <Typography color="primary" variant="h2" component="h2">
        LATEST:
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
        {subset.map((game) => (
          <Grid item xs={12} md={4} key={game._id}>
            <GameComponent
              _id={game._id}
              title={game.title}
              phone={game.phone}
              img={game.image.url}
              alt={game.image.alt}
              like={game.likes}
              email={game.email}
              onFavGame={handleFavGame}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 10,
        }}
        color="primary"
        shape="rounded"
        variant="outlined"
        siblingCount={1}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Fragment>
  );
};

export default HomePage;
