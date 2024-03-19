import { Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ to, children }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography color={isActive ? "secondary" : "#FFF"} sx={{ p: 2 }}>
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
