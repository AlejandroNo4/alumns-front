import { useEffect, useState } from 'react';
import axios from 'axios';

const useRequestGet = (url) => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true);
  const getting = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/${url}`, {
        withCredentials: true,
      });
      const { data } = response;
      setData(data);

    } catch (error) {
      if (error.response) {
        if (error.response) {
          const { data } = error.response;
          const errorsToSet = Object.keys(data).map((o) => `${o}: ${data[o]}`);
          setErrors({ status: 'Error', errorsToSet });
        }
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getting();
  }, []);
  return { data, loading, errors };
};

export default useRequestGet;

