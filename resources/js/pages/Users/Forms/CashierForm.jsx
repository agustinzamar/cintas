import Grid from '@mui/material/Grid';
import { TextField } from '@/components/common/Inputs/TextField';

export const CashierForm = ({ control }) => {
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
        <TextField control={control} name="dni" labelText="DNI" required />
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
      <Grid item xs={6}>
        <TextField
          control={control}
          name="salary"
          labelText="Salario por hora"
        />
      </Grid>
    </>
  );
};
