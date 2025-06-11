import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/basic/AuthForm';

const Login = () => {
  const [error, setError] = useState('');
  

  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.data);
      navigate('/landing');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthForm
      title="Login"
      onSubmit={handleLogin}
      error={error}
    />
  );
};

export default Login;