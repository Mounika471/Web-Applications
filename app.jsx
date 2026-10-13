import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Student Details</h1>

      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>
          <p>Marks: {student.marks}</p>
          <p>Course: {student.course}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;