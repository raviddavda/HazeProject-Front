import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (method, url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios(method)(url)
      .then(({ data }) => {
        // console.log(data);
        setData(data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return { data };
};

export default useFetch;
