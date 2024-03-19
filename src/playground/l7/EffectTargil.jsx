import React, { useEffect } from "react";
import { useState } from "react";

const EffectTargil = () => {
  let [counter, setCounter] = useState("");
  useEffect(() => {
    setInterval(() => {
      counter = 1;
      setCounter(counter + 1);
    }, 1000);
  }, [counter]);
  return <div>EffectTargil</div>;
};

export default EffectTargil;
