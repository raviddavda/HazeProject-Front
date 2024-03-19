import { Typography } from "@mui/material";
import { Fragment } from "react";

const Paragraphs = () => {
  let n = 2;
  return (
    <Fragment>
      <Typography
        variant="body1"
        sx={[
          { fontWeight: "700", fontSize: "2rem", textAlign: "center" },
          n > 1 && { color: "blue" },
        ]}
      >
        I'm Ravid, Fullstack development student. My hobbies are playing video
        games and playing music
      </Typography>
    </Fragment>
  );
};

export default Paragraphs;
