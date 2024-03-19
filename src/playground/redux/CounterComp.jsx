import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { counterActions } from "../../store/counterSlice";
import { Button, TextField } from "@mui/material";

const CounterComp = () => {
  const [txt, setTxt] = useState();
  const dispatch = useDispatch();
  const handleAdd1Click = () => {
    dispatch(counterActions.add1());
  };

  const handleSub1 = () => {
    dispatch(counterActions.sub1());
  };

  const handleChange = (e) => {
    setTxt(e.target.value);
  };

  const handleAddNum = () => {
    dispatch(counterActions.add(txt));
  };

  const handleSub = () => {
    dispatch(counterActions.sub(txt));
  };
  return (
    <Fragment>
      <Button variant="contained" onClick={handleAdd1Click}>
        ADD 1
      </Button>
      <TextField value={txt} onChange={handleChange} />
      <Button variant="contained" onClick={handleAddNum}>
        ADD
      </Button>
      <Button onClick={handleSub1}>SUBTRACT 1</Button>
      <Button onClick={handleSub}>SUBTRACT</Button>
    </Fragment>
  );
};

export default CounterComp;
