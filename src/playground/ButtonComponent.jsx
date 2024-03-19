import { Button, Container } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

const ButtonComponent = () => {
  const handleBtnClick = () => {
    alert("is it ok to use alert in react?");
  };
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Button startIcon={<HomeIcon />} variant="outlined">
        Home
      </Button>
      <Button variant="contained" onClick={handleBtnClick}>
        Click
      </Button>
      <Button>Click</Button>
      <Button variant="outlined" disabled>
        Click
      </Button>
    </Container>
  );
};

export default ButtonComponent;
