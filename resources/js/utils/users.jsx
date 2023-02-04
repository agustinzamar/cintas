import { RoleEnum } from '@/enums/RoleEnum';
import { CustomerForm } from '@/pages/Users/Forms/CustomerForm';
import { AdminForm } from '@/pages/Users/Forms/AdminForm';
import { ProfessorForm } from '@/pages/Users/Forms/ProfessorForm';
import { CashierForm } from '@/pages/Users/Forms/CashierForm';

export function mapRoleToForm(role, control, readonly = false) {
  switch (role) {
  case RoleEnum.CUSTOMER:
    return <CustomerForm control={control} readonly={readonly} />;
  case RoleEnum.SUPERADMIN:
    return <AdminForm control={control} readonly={readonly} />;
  case RoleEnum.ADMIN:
    return <AdminForm control={control} readonly={readonly} />;
  case RoleEnum.PROFESSOR:
    return <ProfessorForm control={control} readonly={readonly} />;
  case RoleEnum.CASHIER:
    return <CashierForm control={control} readonly={readonly} />;
  default:
    return null;
  }
}
