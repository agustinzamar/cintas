import Grid from '@mui/material/Grid';
import { TextField } from '@/components/common/Inputs/TextField';

export const AdminForm = ({ control }) => {
  return (
    <>
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
        <TextField control={control} name="phone" labelText="Teléfono" />
      </Grid>
    </>
  );
};
