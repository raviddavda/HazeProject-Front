import { Typography } from "@mui/material";
import { memo } from "react";

const CarChildComponent = ({ children }) => {
  return <Typography>{children}</Typography>;
};
export default memo(CarChildComponent);
