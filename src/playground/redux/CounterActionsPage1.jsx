import { Button } from "@mui/material";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { counterActions } from "../../store/counterSlice";

const CounterActionsPage = () => {
  const dispatch = useDispatch();
  const handleAdd1Click = () => {
    dispatch(counterActions.add1());
  };
  return (
    <Fragment>
      <Button onClick={handleAdd1Click}>add 1</Button>
    </Fragment>
  );
};

export default CounterActionsPage;
