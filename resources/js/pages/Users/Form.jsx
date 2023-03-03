import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Title from '@/components/common/Title';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import UsersApi from '@/api/UsersApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useGetUser } from '@/hooks/users/useGetUser';
import { useGetRoles } from '@/hooks/users/useGetRoles';
import { Box } from '@/components/common/Box';
import { Select } from '@/components/common/Inputs/Select';
import { TextField } from '@/components/common/Inputs/TextField';
import { RoleEnum } from '@/enums/RoleEnum';
import { useGetAllCompanies } from '@/hooks/companies/useGetAllCompanies';
import { Cancel } from '@/components/common/Buttons/Cancel';

export const UserForm = () => {
  const { userId } = useParams();
  const existingUser = useGetUser(userId);
  const navigate = useNavigate();
  const roles = useGetRoles();
  const { data: companies, isLoading: isLoadingCompanies } =
    useGetAllCompanies();
  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: existingUser,
  });
  const { mutate, isLoading: isLoadingMutate } = useMutation(
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
    } else {
      reset({
        role_id: roles ? roles[0].id : null,
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
  const isLoading = isLoadingCompanies || isLoadingMutate;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title>{title}</Title>
        </Grid>
        <Grid item xs={6}>
          <TextField
            control={control}
            name="name"
            labelText="Nombre completo"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            control={control}
            name="email"
            labelText="Correo electrónico"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField control={control} name="dni" labelText="DNI" />
        </Grid>
        <Grid item xs={6}>
          <TextField control={control} name="phone" labelText="Teléfono" />
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
        {roleId === RoleEnum.MANAGER && (
          <Grid item xs={6}>
            <Select
              control={control}
              name="company_id"
              required
              labelText="Sucursal"
              data={companies}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Cancel />
          <Button variant="contained" type="submit">
            {title}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
