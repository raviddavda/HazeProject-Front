import { Typography } from "@mui/material";
import styles from "./Css1Component.module.css";

const SecondaryHeading = () => {
  return (
    <Typography variant="h2" className={styles.h2} color="secondary">
      This Site was built using React
    </Typography>
  );
};

export default SecondaryHeading;
