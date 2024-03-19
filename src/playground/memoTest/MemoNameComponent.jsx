import { Typography } from "@mui/material";
import { memo } from "react";

const MemoNameComponent = ({ children }) => {
  return <Typography>{children}</Typography>;
};

export default memo(MemoNameComponent);
