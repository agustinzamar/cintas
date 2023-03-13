import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Copyright } from '@/components/Copyright';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '@/assets/img/logo.png';
import Bubble from '@/assets/img/bubble.png';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import AuthApi from '@/api/AuthApi';
import { parseBackendErrors } from '@/utils/validations';
import { toast } from 'react-toastify';
import { Loader } from '@/components/common/Loader';

export function RecoverAccount() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Campo email requerido')
      .email('Error de formato en el email'),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const { mutate, isLoading } = useMutation(AuthApi.resetPasswordEmail);

  const onSubmit = data => {
    mutate(data, {
      onSuccess: () =>
        toast.success('Se ha enviado un correo a su casilla de email.'),
      onError: err =>
        toast.error(
          parseBackendErrors(err, 'Hubo un error al enviar el correo.')
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
      {isLoading && <Loader />}
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
            label="Direccion de email"
            autoComplete="email"
            autoFocus
            {...register('email', { required: true })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Recuperar contraseña
          </Button>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid item xs>
              <Link to="/login" variant="body2">
                Iniciar sesion
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}
