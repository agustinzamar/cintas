import { RoleEnum } from '@/enums/RoleEnum';
import { AdminForm } from '@/pages/Users/Forms/AdminForm';
import { ManagerForm } from '@/pages/Users/Forms/ManagerForm';

export function mapRoleToForm(role, control, readonly = false) {
  switch (role) {
  case RoleEnum.ADMIN:
    return <AdminForm control={control} readonly={readonly} />;
  case RoleEnum.MANAGER:
    return <ManagerForm control={control} />;
  default:
    return null;
  }
}
