import { Typography } from "@mui/material";
import styles from "./Css1Component.module.css";

const Heading = () => {
  return (
    <Typography variant="h1" className={styles.h1} color="primary">
      Welcome to my Site!
    </Typography>
  );
};

export default Heading;
