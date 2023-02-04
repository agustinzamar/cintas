import { Box } from '@/components/common/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@/components/common/Inputs/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { Title } from '@/components/common/Title';
import { useState } from 'react';

export const CustomerAdditionalForms = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { control, handleSubmit } = useForm();

  const toggleEdit = () => setIsEditing(!isEditing);
  const cancelEditing = () => {
    toggleEdit();
    // reset();
  };
  const onSubmit = data => {
    // console.log(data);
  };

  return (
    <>
      <Box style={{ marginTop: '2rem' }} onSubmit={handleSubmit(onSubmit)}>
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
                  <TableCell>Tipo</TableCell>
                  <TableCell>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2} align="center">
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
            <TextField control={control} name="email" labelText="Email" />
          </Grid>
          <Grid item xs={12}>
            <TextField control={control} name="address" labelText="Dirección" />
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
