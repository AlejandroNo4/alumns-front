import { Link } from 'react-router-dom';

const NotLogged = () => {
  return (
    <div className='full-page-container d-flex flex-column justify-center align-center'>
      <h1 className='title-session'> Please log in or sign Up</h1>
      <div className='links-session-wrapper d-flex'>
        <Link className='link' to={'/sign-up'}>Sign Up</Link>
        <Link className='link' to={'/login'}>Log In</Link>
      </div>
    </div>
  );
};

export default NotLogged;
