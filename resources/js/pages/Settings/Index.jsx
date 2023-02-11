import Grid from '@mui/material/Grid';
import { Title } from '@/components/common/Title';
import { SubTitle } from '@/components/common/SubTitle';
import { Box } from '@/components/common/Box';
import { useForm } from 'react-hook-form';
import { Switch } from '@/components/common/Inputs/Switch';
import Typography from '@mui/material/Typography';

export const SettingsIndex = () => {
  const { control } = useForm();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Title>Configuraciones</Title>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <SubTitle>Acceso a cualquier sucursal</SubTitle>
              <Typography variant="body1">
                Activar esta configuración permitirá que los usuarios puedan
                acceder a cualquier sucursal y no solo en la que fue registrado
                inicialmente
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Switch
                control={control}
                labelText="Permitir"
                name="branches"
                labelPlacement="start"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <SubTitle>Habilitar el control de stock</SubTitle>
              <Typography variant="body1">
                Esta configuración permite habilitar el control de stock en el
                sistema
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Switch
                control={control}
                labelText="Permitir"
                name="stock"
                labelPlacement="start"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
