import axios from 'axios';
import { useState } from 'react';
import ErrorBanner from './ErrorBanner';

const AddGrade = ({ alumns, courses }) => {
  const initialState = {
    alumn_id: 1,
    course_id: 1,
    note: 0,
    quarter: 1,
  };
  const [gradeValues, setGradeValue] = useState(initialState);
  const [errorMessages, setErrors] = useState([]);
  const alumnOptions = alumns.map((alumn) => (
    <option key={`${alumn.name}${alumn.id}`} value={alumn.id}>
      {alumn.name}
    </option>
  ));
  const courseOptions = courses.map((course) => (
    <option key={`${course.name}${course.id}`} value={course.id}>
      {course.name}
    </option>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = async () => {
      try {
        await axios.post(
          'http://localhost:3001/api/v1/grades',
          { grade: gradeValues },
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

  const handleChange = (event) => {
    const { id, value } = event.target;
    setGradeValue({ ...gradeValues, [id]: +value });
  };

  return (
    <div className='form-wrapper w-100 justify-center d-flex flex-column align-center'>
      {errorMessages.length > 0 && <ErrorBanner errorsArr={errorMessages} />}
      <h2>Add Grade</h2>
      <form className='d-flex flex-column align-center' onSubmit={handleSubmit}>
        <div className='d-flex'>
          <select className='select' id='alumn_id' onChange={handleChange}>
            {alumnOptions}
          </select>
          <select className='select' id='course_id' onChange={handleChange}>
            {courseOptions}
          </select>
        </div>
        <div className='d-flex number-selector-wrapper'>
          <div className='d-flex align-center p-15'>
            <p>Grade:</p>
            <input
              className='number-selector'
              type='number'
              min='0'
              max='10'
              id='note'
              value={gradeValues.note}
              onChange={handleChange}
            />
          </div>
          <div className='d-flex align-center p-15'>
            <p>Quarter:</p>
            <input
              className='number-selector'
              type='number'
              min='1'
              max='4'
              id='quarter'
              value={gradeValues.quarter}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className='button-submit' type='submit'>
          Add Grade
        </button>
      </form>
    </div>
  );
};

export default AddGrade;
