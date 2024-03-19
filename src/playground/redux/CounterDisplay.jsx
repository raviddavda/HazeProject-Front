import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const CounterDisplay = () => {
  const counter = useSelector((bigPie) => bigPie.counterSlice.counter);
  return (
    <Fragment>
      <Typography variant="h2">{counter}</Typography>
      <Outlet />
    </Fragment>
  );
};

export default CounterDisplay;
