import { Box, Container } from "@mui/material";
import React from "react";

const ContainerComp = ({ children }) => {
  return (
    <Container sx={{ mb: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "2%",
          borderRadius: "10px",
          border: "1px solid lightgray",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default ContainerComp;
