import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import Grades from './pages/Grades';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

function AppContent({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/logout', { method: 'POST', credentials: 'include' });
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/adminpanel"
          element={<AdminPanel currentUser={currentUser} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
      </Routes>
    </>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('/api/currentUser', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCurrentUser(data.user));
  }, []);

  return (
    <Router>
      <AppContent currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </Router>
  );
}

export default App;