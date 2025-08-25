import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ currentUser, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">deliApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <>
                {currentUser?.role === 'god' && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/adminpanel">Admin Panel</NavLink>
                  </li>
                )}  
                <li className="nav-item"><Link className="nav-link" to="/news">News</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/grades">Grades</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">{currentUser.username}</Link></li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" style={{color: 'white'}} onClick={onLogout}>Logout</button>
                </li>
                
              </>
            ) : (
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}