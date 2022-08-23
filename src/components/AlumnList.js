const AlumnList = ({ grades, alumnCourses }) => {
  return [...Array(4)].map((_, idx) => {
    const filtered = grades.filter((g) => g.quarter === idx + 1);
    return (
      <div className='quarter-wrapper' key={idx}>
        <h3>Quarter {idx + 1}</h3>
        {filtered.map((g) => (
          <div className='d-flex' key={g.id}>
            <p className={`mr-10 third-w ${g.status}`}>
              {alumnCourses[g.course_id]}
            </p>
            <p className={`mr-10 third-w ${g.status}`}>Grade: {g.note}</p>
            <p className={`mr-10 third-w ${g.status}`}>{g.status}</p>
          </div>
        ))}
      </div>
    );
  });
};

export default AlumnList;
