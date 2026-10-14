
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);

  function registerStudent(e) {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "") {
      alert("Please enter your name and email!");
      return;
    }

    setStudents([
      ...students,
      { name: name, email: email }
    ]);

    setName("");
    setEmail("");
  }

  return (
    <div className="app">
      <h1>Student Registration</h1>
      <p>Welcome! Register your details below.</p>

      <form onSubmit={registerStudent}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      <h2>Registered Students</h2>

      {students.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
        students.map((student, index) => (
          <div className="student" key={index}>
            <strong>{student.name}</strong>
            <p>{student.email}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;