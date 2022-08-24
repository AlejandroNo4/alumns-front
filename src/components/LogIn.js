import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorBanner from './ErrorBanner';

const LogIn = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const [formValues, setValue] = useState(initialState);
  const [errorMessages, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setValue({ ...formValues, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = async () => {
      try {
        await axios.post(
          'http://localhost:3001/api/v1/sessions',
          { teacher: formValues },
          {
            withCredentials: true,
          }
        );
        navigate('/');
      } catch (error) {
        const { data } = error.response;
        setErrors(Object.keys(data).map((o) => `${o}: ${data[o]}`));
      }
    };
    request();
  };

  return (
    <div className='full-page-container d-flex flex-column justify-center align-center'>
      {errorMessages.length > 0 && <ErrorBanner errorsArr={errorMessages} />}
      <h1 className='title-session'>Log in with your account</h1>
      <form className='d-flex flex-column form-sign-up' onSubmit={handleSubmit}>
        <input
          className='input-text'
          type='email'
          id='email'
          onChange={handleChange}
          placeholder='email'
        />
        <input
          className='input-text'
          type='password'
          id='password'
          onChange={handleChange}
          placeholder='password'
        />
        <button className='session-btn' type='submit'>
          Log in
        </button>
      </form>
      <p>Don't ave an account?</p>
      <Link className='link' to={'/sign-up'}>
        Sign Up
      </Link>
    </div>
  );
};

export default LogIn;
