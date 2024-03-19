import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  MenuList,
  Menu,
  Switch,
  Button,
  Avatar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchComp from "./ui/SearchComp";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import TabsRouter from "./ui/TabsComp";
import axios from "axios";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataFromServer, setDataFromServer] = useState(null);
  const userData = useSelector((bigPie) => bigPie?.authSlice?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/users/${userData?._id}`)
      .then(({ data }) => {
        setDataFromServer(data.rest);
      })
      .catch((error) => {});
  }, [userData]);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate(ROUTES.LOGIN);
    window.location.reload();
  };

  const handleProfileBtn = () => {
    handleMenuClose();
    navigate(`${ROUTES.PROFILE}/${userData._id}`);
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userData ? (
        <MenuList>
          <MenuItem onClick={handleProfileBtn}>Profile</MenuItem>
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </MenuList>
      ) : (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate(ROUTES.LOGIN);
          }}
        >
          Login
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 15 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ alignItems: "center" }}>
          <Typography
            component={Link}
            variant="h6"
            to={ROUTES.HOME}
            color="inherit"
            sx={{ textDecoration: "none", pr: 1 }}
          >
            Haze
          </Typography>
          <SearchComp />
          <TabsRouter />
          <LightModeIcon color="inherit" />
          <Switch checked={!!isDarkTheme} onChange={handleThemeChange} />
          <DarkModeIcon color="inherit" />
          <Box sx={{ display: "flex", position: "absolute", right: 0, mr: 2 }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Typography sx={{ fontSize: "1.2rem", mr: 2 }}>
                {dataFromServer && dataFromServer.name.first}{" "}
                {dataFromServer && dataFromServer.name.last}
              </Typography>
              {dataFromServer?.image.url ? (
                <Avatar
                  alt="User Profile Picture"
                  src={dataFromServer.image.url}
                  sx={{ width: 40, height: 40 }}
                />
              ) : (
                <AccountCircle color="inherit" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default HeaderComponent;
