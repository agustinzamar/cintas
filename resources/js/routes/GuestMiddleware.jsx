import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function GuestMiddleware() {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth) {
    return <Outlet />;
  }

  return <Navigate to={location.state.path} replace />;
}
