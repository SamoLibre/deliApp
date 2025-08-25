import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/news', { credentials: 'include' })
      .then(res => {
        if (res.status === 401) {
          navigate('/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setNewsList(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert('Failed to fetch news: ' + err.message);
      });
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>Haberler</h1>
      {newsList.length === 0 && <div>Hiç haber yok.</div>}
      {newsList.map(news => (
        <div key={news._id} className="card mb-3">
          <div className="card-body">
            <h4>{news.title}</h4>
            <p>{news.content}</p>
            <small className="text-muted">
              Yayınlayan: {news.author?.username || 'Bilinmiyor'} | {new Date(news.createdAt).toLocaleString('tr-TR')}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}