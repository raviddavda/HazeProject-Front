import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ROUTES from "../../routes/ROUTES";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to={ROUTES.HOME}
          label="Home"
          value={value}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={ROUTES.ABOUT}
          label="About"
          value={value}
          icon={<InfoIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={ROUTES.WISHLIST}
          label="Favorites"
          value={value}
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default FooterComponent;
