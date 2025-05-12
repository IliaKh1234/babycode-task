import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [log, setLog] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLog(true)
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList user={user} />} />
        <Route path="/add" element={<AddStudentForm isLoggedIn={log}/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
