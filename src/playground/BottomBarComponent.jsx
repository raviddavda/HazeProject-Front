import { Button, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

const BottomBar = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", position: "sticky" }}
    >
      <Button startIcon={<FacebookIcon />}></Button>
    </Container>
  );
};

export default BottomBar;
