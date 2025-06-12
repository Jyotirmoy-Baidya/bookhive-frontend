import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AuthForm = ({ title, onSubmit, error, isRegister = false }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = isRegister
      ? { email, user_name: userName, password }
      : { email, password };
    onSubmit(payload);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>{title}</h2>
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            style={styles.input}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        )}

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={styles.button}>{title}</button>

        <div>{
          isRegister ? <div>Have an account? <NavLink to='/login'>Login</NavLink></div> : <div>Don't have an account? <NavLink to={'/register'}>Register</NavLink></div>
        }</div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

export default AuthForm;