import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"; 
import { db } from '../services/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';

const AddStudentForm = ({ isLoggedIn }) => {
  const [form, setForm] = useState({ name: "", email: "", course: "", status: "" });
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true)
    });
    return () => unsubscribe();
  }, []);
  
  
  if (!isLoggedIn) return <p>Please log in to add a student.</p>;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, course, status } = form;

    if (!name || !email || !course) return alert('All fields are required');
    if (!email.includes('@')) return alert('Invalid email');

    try {
      await addDoc(collection(db, 'students'), {
        name,
        email,
        course,
        status,
      });
      alert('Student added successfully');
      setForm({ name: '', email: '', course: '', status: '' }); 
    } catch (err) {
      console.error('Error adding student:', err);
      alert('Failed to add student');
    }
  };

  const handleLogo = () =>{
    navigate('/')
  }

  return (
    <>
    <img onClick={handleLogo} style={{width: '100px', position: 'absolute', top: '20px', left: '50px', cursor:"pointer" }} src={logo} alt="" />
    <div className='addStudentParent'>
<form className='addStudentForm' onSubmit={handleSubmit}>
  <div>
  <input
      placeholder="Name"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />
    <input
      placeholder="Email"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />
  </div>
   <div>
   <input
      placeholder="Course"
      value={form.course}
      onChange={(e) => setForm({ ...form, course: e.target.value })}
    />
  <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="" disabled>Select Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Pending">Pending</option>
      </select>
   </div>
   
    <button className="addStudent" style={{width:'200px'}} type="submit">Add Student</button>
  </form>
    </div>
    </>
  );
};

export default AddStudentForm;
