import React, { useState } from 'react';

const AddStudentForm = ({ isLoggedIn }) => {
  const [form, setForm] = useState({ name: "", email: "", course: "" });

  if (!isLoggedIn) return <p>Please log in to add a student.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.course) {
      return alert("All fields are required");
    }
    if (!form.email.includes("@")) {
      return alert("Invalid email");
    }
    console.log("Student added:", form); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Course" onChange={e => setForm({ ...form, course: e.target.value })} />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
