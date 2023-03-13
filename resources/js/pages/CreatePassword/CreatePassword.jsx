import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Copyright } from '@/components/Copyright';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '@/assets/img/logo.png';
import Bubble from '@/assets/img/bubble.png';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import AuthApi from '@/api/AuthApi';
import { parseBackendErrors } from '@/utils/validations';
import { Loader } from '@/components/common/Loader';

export function CreatePassword() {
  const { token } = useParams();
  const schema = yup.object().shape({
    password: yup.string().required('Campo contraseña requerido'),
    password_confirmation: yup
      .string()
      .required('Campo confirmar contraseña requerido')
      .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
    email: yup.string().email().required('Campo correo electrónico requerido'),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { errors } = formState;
  const { mutate, isLoading } = useMutation(AuthApi.resetPassword);

  const onSubmit = data => {
    mutate(
      { ...data, token },
      {
        onSuccess: () => {
          toast.success('Su contraseña ha sido actualizada con éxito');
          navigate('/login');
        },
        onError: error =>
          parseBackendErrors(
            error,
            'Ocurrió un error al cambiar la contraseña'
          ),
      }
    );
  };
  const showErrors = error => {
    toast.error(errors[error]?.message);
  };

  useEffect(() => {
    let err = Object.keys(errors);
    if (err.length > 0) err.map(e => showErrors(e));
  }, [errors]);

  return (
    <Container
      onSubmit={handleSubmit(onSubmit)}
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={Bubble}
        alt="asset_bubble"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '30vmin',
        }}
      />
      <img
        src={Bubble}
        alt="asset_bubble"
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          transform: 'rotate(180deg)',
          width: '30vmin',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLoading && <Loader />}
        <img src={logo} alt="Logo" width="250" />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Correo electrónico"
            type="email"
            {...register('email', { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nueva contraseña"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmar contraseña"
            type="password"
            autoComplete="current-password"
            {...register('password_confirmation', { required: true })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear contraseña
          </Button>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}
