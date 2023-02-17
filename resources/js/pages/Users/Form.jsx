import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Title from '@/components/common/Title';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import UsersApi from '@/api/UsersApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Loader } from '@/components/common/Loader';
import { useGetUser } from '@/hooks/users/useGetUser';
import { useGetRoles } from '@/hooks/users/useGetRoles';
import { Box } from '@/components/common/Box';
import { Select } from '@/components/common/Inputs/Select';
import { mapRoleToForm } from '@/utils/users';
import { CompaniesDropDown } from '@/components/admin/CompaniesDropDown';

export const UserForm = () => {
  const { userId } = useParams();
  const existingUser = useGetUser(userId);
  const navigate = useNavigate();
  const roles = useGetRoles();
  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: existingUser,
  });
  const { mutate, isLoading } = useMutation(
    userId ? UsersApi.update : UsersApi.create
  );
  const roleId = watch('role_id');

  useEffect(() => {
    if (existingUser) {
      reset({
        ...existingUser,
        role_id: existingUser.role?.id,
        company_id: existingUser.company?.id,
      });
    }
  }, [existingUser]);

  const onSubmit = data => {
    data.id = userId;
    mutate(data, {
      onSuccess: () => {
        toast.success(
          `Usuario ${userId ? 'actualizado' : 'creado'} exitosamente`
        );
        if (!userId) {
          navigate(-1);
        }
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  const title = `${existingUser ? 'Modificar' : 'Crear'} usuario`;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title>{title}</Title>
        </Grid>
        <Grid item xs={6}>
          <Select
            control={control}
            data={roles}
            name="role_id"
            labelText="Rol"
            required
          />
        </Grid>
        <Grid item xs={6} />
        {mapRoleToForm(roleId, control)}
        <Grid item xs={6}>
          <CompaniesDropDown control={control} />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            sx={{ marginRight: '1rem' }}
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            {title}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
