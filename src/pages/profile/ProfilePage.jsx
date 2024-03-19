import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import ContainerComp from "../../components/ContainerComp";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import toastMessage from "../../components/toastMessage";

const ProfilePage = () => {
  const [dataFromServer, setDataFromServer] = useState("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then(({ data }) => {
        setDataFromServer(data.rest);
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

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/users/${id}`);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      dispatch(authActions.logout());
      navigate(ROUTES.HOME);
      toastMessage("User Deleted!", "delete");
    } catch (error) {
      toast.error("Could not fetch user!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: localStorage.getItem("darkMode") ? "dark" : "light",
        toastId: "user",
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ContainerComp>
      {dataFromServer ? (
        <>
          <Box sx={{ display: "flex" }}>
            <Typography color="primary" variant="h2" component="h2">
              {dataFromServer.name.first} {dataFromServer.name.middle}{" "}
              {dataFromServer.name.last}
            </Typography>
          </Box>
          <Divider sx={{ m: 2 }} />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {dataFromServer.isAdmin && (
              <Typography variant="h4">ADMIN</Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column-reverse" },
              justifyContent: "space-between",
              alignItems: "start",
              m: 1,
            }}
          >
            <Box>
              <Typography variant="h6">
                Email: <Typography>{dataFromServer.email}</Typography>
              </Typography>
              <Typography variant="h6">
                Date Created:{" "}
                <Typography>{dataFromServer.createdAt}</Typography>
              </Typography>
              <Typography variant="h6">
                Phone: <Typography>{dataFromServer.phone}</Typography>
              </Typography>
              <Typography variant="h6">
                Address:{" "}
                <Typography>
                  {dataFromServer.address.state === "not defined"
                    ? ""
                    : `${dataFromServer.address.state}, `}
                  {dataFromServer.address.country},{" "}
                  {dataFromServer.address.street},{" "}
                  {dataFromServer.address.houseNumber},{" "}
                  {dataFromServer.address.zip}{" "}
                </Typography>
              </Typography>
              <Typography component="span">
                <Typography variant="h6">
                  Account Level:
                  {dataFromServer.isBusiness ? (
                    <Typography>Business Account</Typography>
                  ) : (
                    <Typography>Guest Account</Typography>
                  )}
                </Typography>
              </Typography>
              <Typography variant="h6">
                Account ID: <Typography>{dataFromServer._id}</Typography>
              </Typography>
            </Box>
            <Box
              sx={{
                width: { md: "30%", xs: "100%" },
                display: "flex",
                justifyContent: { xs: "center" },
                m: { xs: 1 },
              }}
            >
              <img
                style={{ width: "250px" }}
                src={dataFromServer.image.url}
                alt={dataFromServer.image.alt}
              />
            </Box>
          </Box>
          <Button
            sx={{ m: 1 }}
            component={Link}
            to={`${ROUTES.PROFILEEDIT}/${id}`}
            variant="contained"
          >
            Edit user
          </Button>
          <Button
            sx={{ m: 1 }}
            color="error"
            variant="contained"
            onClick={handleClickOpen}
          >
            Delete user
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete User?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This cannot be undone, are you sure you want to delete this
                user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                CANCEL
              </Button>
              <Button color="error" onClick={handleDeleteUser}>
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <CircularProgress />
      )}
    </ContainerComp>
  );
};

export default ProfilePage;
