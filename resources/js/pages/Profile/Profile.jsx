import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import UsersApi from '@/api/UsersApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useGetUser } from '@/hooks/users/useGetUser';
import { Box } from '@/components/common/Box';
import { TextField } from '@/components/common/Inputs/TextField';
import { CancelButton } from '@/components/common/Buttons/CancelButton';
import { parseBackendErrors } from '@/utils/validations';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Title from '@/components/common/Title';

export const Profile = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email('Error de formato en el email'),
  });
  const { userId } = useParams();
  const existingUser = useGetUser(userId);
  const navigate = useNavigate();
  const { handleSubmit, control, reset, formState } = useForm({
    defaultValues: existingUser,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const { mutate, isLoading: isLoadingMutate } = useMutation(
    userId ? UsersApi.update : UsersApi.create
  );

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
      onError: err =>
        toast.error(
          parseBackendErrors(err, 'Hubo un error al crear el usuario')
        ),
    });
  };

  const showErrors = error => {
    toast.error(errors[error]?.message);
  };

  useEffect(() => {
    let err = Object.keys(errors);
    if (err.length > 0) err.map(e => showErrors(e));
  }, [errors]);

  const isLoading = isLoadingMutate;
  const title = 'Editar perfil';
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
          <TextField
            control={control}
            name="password"
            labelText="Nueva contraña"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            control={control}
            name="password"
            labelText="Confirmar contraña"
          />
        </Grid>
        <Grid item xs={12}>
          <CancelButton />
          <Button variant="contained" type="submit">
            Actualizar datos
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
