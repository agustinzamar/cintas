import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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

export function RecoverAccount() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = data => {
    login(data)
      .then(() => {
        navigate(state?.path || '/');
      })
      .catch(() =>
        toast.error(
          'El email no existe en el sistema, pongase en contacto con el administrador.'
        )
      );
  };

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
