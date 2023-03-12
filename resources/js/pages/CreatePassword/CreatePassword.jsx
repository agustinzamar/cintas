import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Copyright } from '@/components/Copyright';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/img/logo.png';
import Bubble from '@/assets/img/bubble.png';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

export function CreatePassword() {
  const schema = yup.object().shape({
    newPassword: yup.string().required('Campo contraseña requerido'),
    confirmPassword: yup
      .string()
      .required('Campo confirmar contraseña requerido')
      .oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden'),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();
  const { errors } = formState;

  const onSubmit = data => {
    login(data)
      .then(() => {
        navigate(state?.path || '/');
      })
      .catch(() => toast.error('Ocurrio un error.'));
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
        <img src={logo} alt="Logo" width="250" />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nueva contraseña"
            type="password"
            autoComplete="current-password"
            {...register('newPassword', { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmar contraseña"
            type="password"
            autoComplete="current-password"
            {...register('confirmPassword', { required: true })}
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
