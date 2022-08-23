import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotLogged from './NotLogged';
import Dashboard from './Dashboard';
import ErrorBanner from './ErrorBanner';

const Home = () => {
  const [teacher, setTeacher] = useState({});
  const [errorMessages, setErrors] = useState([]);

  const logged_in = async () => {
    try {
      const request = await axios.get(
        'http://localhost:3001/api/v1/logged_in',
        {
          withCredentials: true,
        }
      );
      setTeacher(request.data);
    } catch (error) {
      const { data } = error.response;
      setErrors(Object.keys(data).map((o) => `${o}: ${data[o]}`));
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:3001/api/v1/logout', {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      const { data } = error.response;
      setErrors(Object.keys(data).map((o) => `${o}: ${data[o]}`));
    }
  };

  useEffect(() => {
    logged_in();
  }, []);

  return (
    <div>
      {errorMessages.length > 0 && <ErrorBanner errorsArr={errorMessages} />}
      {!teacher.logged_in ? (
        <NotLogged />
      ) : (
        <Dashboard name={teacher.name} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default Home;
