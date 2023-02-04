import { useAuth } from '@/hooks/useAuth';
import { Box } from '@/components/common/Box';
import { Title } from '@/components/common/Title';
import { SubTitle } from '@/components/common/SubTitle';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { mapRoleToForm } from '../../utils/users';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import UsersApi from '@/api/UsersApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TextField } from '@/components/common/Inputs/TextField';

export const Profile = () => {
  const { auth: user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { control, handleSubmit, reset } = useForm();
  const { mutate, isLoading } = useMutation(UsersApi.update);

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        role_id: user.role?.id,
      });
    }
  }, [user]);

  const toggleEdit = () => setIsEditing(!isEditing);

  const cancelEditing = () => {
    reset(user);
    toggleEdit();
  };

  const onSubmit = data => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Perfil actualizado exitosamente');
        toggleEdit();
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Title>Datos Personales</Title>
          </Grid>
          <Grid item xs={1}>
            {!isEditing && (
              <IconButton onClick={toggleEdit}>
                <EditIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12}>
            <SubTitle>
              {user.role.name || 'No Rol'} ({user.company?.name || 'No Empresa'}
              )
            </SubTitle>
          </Grid>
          {mapRoleToForm(user.role.id, control, !isEditing)}
          {isEditing && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                sx={{ marginRight: '1rem' }}
                onClick={cancelEditing}
              >
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Guardar
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      <Box style={{ marginTop: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Title>Alergias y patologias</Title>
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay alergias o patologías registradas
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>

      <Box style={{ marginTop: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Title>Contacto de emergencia</Title>
          </Grid>
          <Grid item xs={1}>
            {!isEditing && (
              <IconButton onClick={toggleEdit}>
                <EditIcon />
              </IconButton>
            )}
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
              name="relationship"
              labelText="Parentezco"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              control={control}
              name="phone"
              labelText="Teléfono"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              control={control}
              name="email"
              labelText="Email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              name="address"
              labelText="Dirección"
              required
            />
          </Grid>
          {isEditing && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                sx={{ marginRight: '1rem' }}
                onClick={cancelEditing}
              >
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Guardar
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};
