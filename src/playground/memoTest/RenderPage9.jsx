import { Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import MemoNameComponent from "./MemoNameComponent";

const animalsArr = ["dog", "cat", "mouse"];

const RenderPage9 = () => {
  const [changeState, setChangeState] = useState(true);

  const handleState = () => {
    setChangeState(!changeState);
  };

  return (
    <Fragment>
      <Typography component="span">
        {animalsArr.map((animal, index) => (
          <MemoNameComponent key={index}>{animal}</MemoNameComponent>
        ))}
      </Typography>
      <Button onClick={handleState}>click</Button>
    </Fragment>
  );
};
export default RenderPage9;
