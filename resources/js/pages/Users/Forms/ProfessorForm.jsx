import Grid from '@mui/material/Grid';
import { TextField } from '@/components/common/Inputs/TextField';

export const ProfessorForm = ({ control, readonly }) => {
  return (
    <>
      <Grid item xs={6}>
        <TextField
          control={control}
          name="name"
          labelText="Nombre completo"
          required
          disabled={readonly}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          control={control}
          name="dni"
          labelText="DNI"
          required
          disabled={readonly}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          control={control}
          name="email"
          labelText="Correo electrónico"
          required
          disabled={readonly}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          control={control}
          name="phone"
          labelText="Teléfono"
          disabled={readonly}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          control={control}
          name="salary"
          labelText="Salario por hora"
          disabled={readonly}
        />
      </Grid>
    </>
  );
};
