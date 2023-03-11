import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { RoleEnum } from '@/enums/RoleEnum';

export function AdminMiddleware() {
  const { auth: user } = useAuth();

  if (![RoleEnum.ADMIN, RoleEnum.SUPERADMIN].includes(user?.role?.id)) {
    return (
      <Navigate
        to={user.role?.default_home_page}
        replace
        state={{ path: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
