import axios from 'axios';
import { useState } from 'react';
import ErrorBanner from './ErrorBanner';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [errorMessages, setErrors] = useState([]);

  const hanldeSubmit = (e) => {
    e.preventDefault();
    const request = async () => {
      try {
        await axios.post(
          'http://localhost:3001/api/v1/courses',
          { course: { name: name } },
          {
            withCredentials: true,
          }
        );
        window.location.reload();
      } catch (error) {
        const { data } = error.response;
        setErrors(Object.keys(data).map((o) => `${o}: ${data[o]}`));
      }
    };
    request();
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <div className='form-wrapper w-100 justify-center d-flex flex-column align-center'>
      {errorMessages.length > 0 && <ErrorBanner errorsArr={errorMessages} />}
      <h2 className='form-title'>Add new Course</h2>
      <form
        className='d-flex align-center flex-column w-100'
        onSubmit={hanldeSubmit}
      >
        <input
          placeholder='Name'
          className='input-text w-80'
          type='text'
          onChange={handleChange}
        />
        <button className='button-submit'>Add course</button>
      </form>
    </div>
  );
};

export default AddCourse;
