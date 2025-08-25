import { Navigate } from 'react-router-dom';

export default function ProtectedAdminRoute({ currentUser, children }) {
  if (!currentUser || currentUser.role !== 'god') {
    return <Navigate to="/" replace />;
  }
  return children;
}