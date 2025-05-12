import { useState } from 'react';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase"; 

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Login failed. Check your credentials.');
      setEmail('');
      setPassword('');
    }
  };
  
  

  const handleLogo = () => {
    navigate('/');
  };

  return (
    <>
      <img onClick={handleLogo} style={{ width: '100px', position: 'absolute', top: '20px', left: '50px' }} src={logo} alt="Logo" />
        <form className='logInForm' onSubmit={handleSubmit}>
          <h1 className='logInTitle' style={{ fontSize: '50px', color: '#3751FE' }}>Log in as Admin</h1>
          <p style={{ marginTop: '10px', color: 'gray' }}>Welcome back, Please Log in to your account</p>
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', marginTop: '20px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ border: '1px solid #C1BBBB', outline: 'none', padding: '5px 50px 5px 10px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ border: '1px solid #C1BBBB', outline: 'none', padding: '5px 50px 5px 10px', margin: '10px 0 20px' }}
            />
            <button
              type="submit"
              style={{ background: '#3751FE', cursor: 'pointer', color: 'white', padding: '5px 20px', border: 'none', outline: 'none', borderRadius: '15px', fontSize: '25px' }}
            >
              Log in
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </form>

      {isLoggedIn && <AddStudentForm isLoggedIn={true} />}
    </>
  );
};

export default Login;
