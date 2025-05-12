import axios from '../services/api';
import { useState } from 'react';
import logo from '../images/logo.png';
import background from '../images/clip-message-sent 1.png';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', { email, password });
      onLogin(res.data);
      navigate('/');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  const handleLogo = () => {
    navigate('/');
  };

  return (
    <>
      <img onClick={handleLogo} style={{ width: '100px', position: 'absolute', top: '20px', left: '50px' }} src={logo} alt="" />

      <div style={{ display: 'flex', height: '100vh', justifyContent: 'space-between' }}>
        <form style={{ transform: 'translate(50%, 30%)' }} onSubmit={handleSubmit}>
          <h1 style={{ fontSize: '50px', color: '#3751FE' }}>Log in as Admin</h1>
          <p style={{ marginTop: '10px', color: 'gray' }}>Welcome back, Please Log in to your account</p>
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', marginTop: '20px' }}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ border: '1px solid #C1BBBB', outline: 'none', padding: '5px 50px 5px 10px' }} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ border: '1px solid #C1BBBB', outline: 'none', padding: '5px 50px 5px 10px', margin: '10px 0 20px' }} />
            <button type="submit" style={{ background: '#3751FE', cursor: 'pointer', color: 'white', padding: '5px 20px', border: 'none', outline: 'none', borderRadius: '15px', fontSize: '25px' }}>Log in</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </form>
        <div style={{ background: 'gray' }}>
          <img style={{ transform: 'translateY(50%)', width: '100%' }} src={background} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;