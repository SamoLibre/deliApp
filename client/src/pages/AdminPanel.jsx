import React, { useEffect, useState } from 'react';

export default function AdminPanel({ currentUser }) {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend on mount
  useEffect(() => {
    fetch('https://deliapp.onrender.com/api/users', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
  }, []);

  console.log('Current user:', currentUser);

  return (
    <div className="container mt-5">
      <h1>Admin Panel</h1>
      <div className="row">
        {/* User Management Card */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h4>Kullanıcı Veritabanı</h4>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Kullanıcı Adı</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2">Güncelle</button>
                        <button className="btn btn-danger btn-sm">Sil</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn btn-primary">Yeni Kullanıcı Oluştur</button>
            </div>
          </div>
        </div>
        {/* News Management Card */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h4>Haber Veritabanı</h4>
            </div>
            <div className="card-body">
              <p>Haberler burada listelenecek.</p>
              <button className="btn btn-primary me-2">Oluştur</button>
              <button className="btn btn-warning me-2">Güncelle</button>
              <button className="btn btn-danger">Sil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}