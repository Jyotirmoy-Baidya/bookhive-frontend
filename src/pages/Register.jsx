import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/basic/AuthForm';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (userDetails) => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('token', data.data);
      navigate('/landing');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthForm
      title="Register"
      onSubmit={handleRegister}
      error={error}
      isRegister
    />
  );
};

export default Register;