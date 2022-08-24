import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotLogged from './NotLogged';
import Dashboard from './Dashboard';
import ErrorBanner from './ErrorBanner';
import useRequestGet from '../api/useRequestGet';

const Home = () => {
  const [teacher, setTeacher] = useState({});
  const [errorMessages, setErrors] = useState([]);

  const logged = useRequestGet('logged_in');

  useEffect(() => {
    if (!logged.loading) {
      setTeacher(logged.data);
      setErrors(logged.errors);
    }
  }, [logged.loading]);

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

  return (
    <div>
      {logged.loading && <h1>Loading</h1>}
      {!logged.loading && (
        <div>
          {errorMessages.length > 0 && (
            <ErrorBanner errorsArr={errorMessages} />
          )}
          {!teacher.logged_in ? (
            <NotLogged />
          ) : (
            <Dashboard name={teacher.name} handleLogout={handleLogout} />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
