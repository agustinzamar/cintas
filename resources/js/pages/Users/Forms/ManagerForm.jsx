import Grid from '@mui/material/Grid';
import { TextField } from '@/components/common/Inputs/TextField';
import { Select } from '@/components/common/Inputs/Select';

export const ManagerForm = ({ control, readonly }) => {
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
          name="email"
          labelText="Correo electrónico"
          required
          disabled={readonly}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          control={control}
          name="dni"
          labelText="DNI"
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
        <Select
          control={control}
          name="company_id"
          required
          labelText="Sucursal"
        />
      </Grid>
    </>
  );
};
