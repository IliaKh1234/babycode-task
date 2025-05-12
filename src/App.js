import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import Login from './components/Login';
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudentForm isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
