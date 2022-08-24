import { useEffect, useState } from 'react';
import AddAlumn from './AddAlumn';
import AddCourse from './AddCourse';
import AddGrade from './AddGrade';
import AlumnList from './AlumnList';
import useRequestGet from '../api/useRequestGet';

const Dashboard = (props) => {
  const { name, handleLogout } = props;
  const [allAlumns, setAlumns] = useState([]);
  const [alumnCourses, setAlumniCourses] = useState({});
  const [registeredCourses, setCourses] = useState([]);

  const alumnStatus = useRequestGet('alumns');
  const courseStatus = useRequestGet('courses');

  useEffect(() => {
    if (!alumnStatus.loading) {
      setAlumns(alumnStatus.data);
    }
  }, [alumnStatus.loading]);

  useEffect(() => {
    if (!courseStatus.loading) {
      setCourses(courseStatus.data);
      const coursesWithIds = courseStatus.data.reduce(
        (obj, item) => ({ ...obj, [item.id]: item.name }),
        {}
      );
      setAlumniCourses(coursesWithIds);
    }
  }, [courseStatus.loading]);

  return (
    <div className='main-container'>
      <h1 className='main-name'>Hello {name}!</h1>
      <div className='w-100 d-flex'>
        <AddAlumn />
        <AddCourse />
        <AddGrade alumns={allAlumns} courses={registeredCourses} />
      </div>
      {(alumnStatus.loading || courseStatus.loading) && <h1>Loading</h1>}
      {!alumnStatus.loading && !courseStatus.loading && (
        <div>
          <div className='d-flex flex-wrap p-15'>
            {allAlumns.map((a, idx) => (
              <div className='alumn-wrapper' key={`${a.name}${idx}`}>
                <h3 className='alumn-name'>{a.name}</h3>
                <AlumnList grades={a.grades} alumnCourses={alumnCourses} />
              </div>
            ))}
          </div>
          <div className='p-15'>
            <h3>Courses:</h3>
            <div className='d-flex'>
              {registeredCourses.map((c) => (
                <p className='p-15'>{c.name}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      <button className='logout-btn' type='button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
