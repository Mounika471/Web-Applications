import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [marks, setMarks] = useState("");
  const [course, setCourse] = useState("");

  async function loadStudents() {
    const response = await fetch("/students");
    const data = await response.json();
    setStudents(data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function addStudent(e) {
    e.preventDefault();

    await fetch("/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        age: Number(age),
        marks: Number(marks),
        course
      })
    });

    setName("");
    setAge("");
    setMarks("");
    setCourse("");
    loadStudents();
  }

  async function editStudent(student) {
    const newName = prompt("Enter name:", student.name);
    if (newName === null) return;

    const newAge = prompt("Enter age:", student.age ?? "");
    if (newAge === null) return;

    const newMarks = prompt("Enter marks:", student.marks);
    if (newMarks === null) return;

    const newCourse = prompt("Enter course:", student.course);
    if (newCourse === null) return;

    await fetch(`/students/${student._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        age: Number(newAge),
        marks: Number(newMarks),
        course: newCourse
      })
    });

    loadStudents();
  }

  async function deleteStudent(id) {
    await fetch(`/students/${id}`, {
      method: "DELETE"
    });

    loadStudents();
  }

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>Add Student</h2>
      <form onSubmit={addStudent}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />
        <input
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <button type="submit">Add Student</button>
      </form>

      <h2>Students</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Marks</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age ?? "-"}</td>
              <td>{student.marks}</td>
              <td>{student.course}</td>
              <td>
                <button onClick={() => editStudent(student)}>
                  Edit
                </button>
                <button onClick={() => deleteStudent(student._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;          