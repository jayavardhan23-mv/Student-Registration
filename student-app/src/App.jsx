  import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);

  // Add student
  const addStudent = (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "") {
      alert("Please enter name and email");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      email: email,
    };

    setStudents([...students, newStudent]);

    setName("");
    setEmail("");
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Student Registration App</h1>
        <p>Register and manage student details</p>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>Register Student</h2>

          <form onSubmit={addStudent}>
            <label>Student Name</label>
            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="add-button">
              Add Student
            </button>
          </form>
        </section>

        <section className="list-section">
          <h2>Student List</h2>

          <p className="student-count">
            Total Students: {students.length}
          </p>

          {students.length === 0 ? (
            <p className="empty-message">
              No students registered yet.
            </p>
          ) : (
            <div className="student-list">
              {students.map((student, index) => (
                <div className="student-card" key={student.id}>
                  <div className="student-info">
                    <h3>{index + 1}. {student.name}</h3>
                    <p>{student.email}</p>
                  </div>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Student Registration App | React Project</p>
      </footer>
    </div>
  );
}

export default App;