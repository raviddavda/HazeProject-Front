import { Chip, Divider, Typography } from "@mui/material";
import { Fragment } from "react";

const TypografyComponent = () => {
  return (
    <Fragment>
      <Typography variant="h1">h1</Typography>
      <Typography variant="h2">h2</Typography>
      <Typography variant="h3">h3</Typography>
      <Typography variant="h4">h4</Typography>
      <Typography variant="h5">h5</Typography>
      <Typography variant="h6">h6</Typography>
      <Typography variant="subtitle1"> subtitle1</Typography>
      <Typography variant="subtitle2"> subtitle2</Typography>
      <Typography variant="body1"> body1</Typography>
      <Typography variant="body2">body2</Typography>
      <Typography variant="h5" component="h2">
        should be h2
      </Typography>
      <Typography fontWeight={300}>300</Typography>
      <Typography fontWeight={400}>400</Typography>
      <Typography fontWeight={500}>500</Typography>
      <Typography fontWeight={700}>700</Typography>
      <Typography
        sx={{
          display: "inline-block",
          color: "primary.light",
          transition: "transform .2s ease-in-out",
          "&:hover": { color: "primary.dark", transform: "scale(500%)" },
        }}
      >
        primary.light
      </Typography>
      <Divider></Divider>
      <Typography>primary.main</Typography>
      <Divider light>
        <Chip label="CHIP" />
      </Divider>
      <Typography
        sx={{
          display: "inline-block",
          color: "primary.main",
          transition: "transform 1s ease-in-out",
          "&:hover": { transform: "rotate(360deg)" },
        }}
      >
        primary.dark
      </Typography>
      <Typography color="secondary">secondary</Typography>
      <Typography color="error">error</Typography>
      <Typography color="warning.main">warning.main</Typography>
      <Typography color="info.main">info.main</Typography>
      <Typography color="success.main">success.main</Typography>
      <Typography color="grey">grey</Typography>
    </Fragment>
  );
};

export default TypografyComponent;
