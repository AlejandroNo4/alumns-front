import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorBanner from './ErrorBanner';

const SignUp = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
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
          'http://localhost:3001/api/v1/teachers',
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
      <h1 className='title-session'>Create your account!</h1>
      <form className='d-flex flex-column form-sign-up' onSubmit={handleSubmit}>
        <input
          className='input-text'
          type='text'
          id='name'
          onChange={handleChange}
          placeholder='name'
        />
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
        <input
          className='input-text'
          type='password'
          id='password_confirmation'
          onChange={handleChange}
          placeholder='password confirmation'
        />
        <button className='session-btn' type='submit'>
          SignUp
        </button>
      </form>
      <p>Have an account?</p>
      <Link className='link' to={'/login'}>
        Log In
      </Link>
    </div>
  );
};

export default SignUp;
