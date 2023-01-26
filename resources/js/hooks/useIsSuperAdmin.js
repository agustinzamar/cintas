import { useAuth } from '@/hooks/useAuth';
import { RoleEnum } from '@/enums/RoleEnum';
import { useEffect, useState } from 'react';

export const useIsSuperAdmin = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    setIsSuperAdmin(auth?.role?.id === RoleEnum.SUPERADMIN);
  }, [auth]);

  return isSuperAdmin;
};
