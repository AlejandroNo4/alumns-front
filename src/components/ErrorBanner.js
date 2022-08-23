import { useEffect, useState } from 'react';

const ErrorBanner = ({ errorsArr }) => {
  const [viz, setViz] = useState('show');

  const handleChange = () => {
    setViz('hide');
  };

  useEffect(() => {
    setViz('show');
  }, [errorsArr]);

  return (
    <div className={`${viz} justify-center align-center error-banner`} >
      <ul>
        {errorsArr.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <button className='close-error' onClick={handleChange} type='button'>
          +
        </button>
    </div>
  );
};

export default ErrorBanner;
