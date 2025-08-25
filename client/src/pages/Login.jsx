import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setCurrentUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://deliapp.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: new URLSearchParams(form).toString()
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentUser(data.user);
        navigate('/');
      } else {
        setError(data.error || 'Giriş başarısız.');
      }
    } catch (err) {
      setError('Giriş başarısız.');
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth: 400}}>
      <h2>Giriş Yap</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Kullanıcı Adı</label>
          <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Şifre</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Giriş</button>
      </form>
    </div>
  );
}