import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { RoleEnum } from '@/enums/RoleEnum';

export function ManagerMiddleware() {
  const { auth: user } = useAuth();

  if (
    ![RoleEnum.ADMIN, RoleEnum.SUPERADMIN, RoleEnum.MANAGER].includes(
      user?.role?.id
    )
  ) {
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
