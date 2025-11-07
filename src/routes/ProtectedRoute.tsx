import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';


interface ProtectedRouteProps {
  allowedRoles: ('admin' | 'user')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Verificando sesión...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(user.data.role)) {
    return <Outlet />;
  }
  return <Navigate to="/unauthorized" replace />;
};
