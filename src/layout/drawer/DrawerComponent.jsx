import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const DrawerComponent = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Home"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={ROUTES.HOME}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Action"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={ROUTES.ACTION}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {["Adventure"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={ROUTES.ADVENTURE}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {["Shooter"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={ROUTES.SHOOTER}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {["RPG"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={ROUTES.RPG}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button color="inherit" onClick={toggleDrawer(true)}>
        HAZE
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
