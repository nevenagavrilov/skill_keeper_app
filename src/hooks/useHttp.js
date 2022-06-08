import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useHttp = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    console.log("nevena");
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [getData]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const getData = async () => {
  //     try {
  //       const res = await axios.get(url);
  //       setData(res.data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getData();
  // }, [url]);

  return { data, isLoading, error, getData };
};

export default useHttp;
