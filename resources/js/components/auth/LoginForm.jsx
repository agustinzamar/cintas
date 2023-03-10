import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Copyright } from '@/components/Copyright';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/img/logo.png';
import Bubble from '@/assets/img/bubble.png';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

export function LoginForm() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Campo email requerido')
      .email('Error de formato en el email'),
    password: yup.string().required('Campo contraseña requerido'),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { errors } = formState;
  const { login } = useAuth();
  const { state } = useLocation();

  const onSubmit = data => {
    login(data)
      .then(() => {
        navigate(state?.path || '/');
      })
      .catch(() => toast.error('Usuario o contraseña incorrecta'));
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
        {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: true })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordarme"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
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
              <Link to="/password-reset">
                ¿Olvidaste tu contraseña? Click aqui. 👈
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}
