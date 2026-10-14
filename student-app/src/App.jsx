import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  // Add or update student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "") {
      alert("Please enter name and email");
      return;
    }

    if (editId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editId
            ? { ...student, name: name, email: email }
            : student
        )
      );

      setEditId(null);
      alert("Student updated successfully!");
    } else {
      const newStudent = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
      };

      setStudents([...students, newStudent]);
      alert("Student added successfully!");
    }

    setName("");
    setEmail("");
  };

  // Edit student
  const editStudent = (student) => {
    setName(student.name);
    setEmail(student.email);
    setEditId(student.id);
  };

  // Delete student
  const deleteStudent = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      setStudents(students.filter((student) => student.id !== id));

      if (editId === id) {
        setEditId(null);
        setName("");
        setEmail("");
      }
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setName("");
    setEmail("");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Student Registration App</h1>
        <p>Register and manage student details</p>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>
            {editId !== null ? "Edit Student" : "Register Student"}
          </h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="student-name">Student Name</label>
            <input
              id="student-name"
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="student-email">Email Address</label>
            <input
              id="student-email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="add-button">
              {editId !== null ? "Update Student" : "Add Student"}
            </button>

            {editId !== null && (
              <button
                type="button"
                className="cancel-button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
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
                    <h3>
                      {index + 1}. {student.name}
                    </h3>
                    <p>{student.email}</p>
                  </div>

                  <div className="student-actions">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => editStudent(student)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </div>
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