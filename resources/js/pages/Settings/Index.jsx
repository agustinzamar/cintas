import Grid from '@mui/material/Grid';
import { Title } from '@/components/common/Title';
import { useGetAllSettings } from '@/hooks/settings/getAllSettings';
import { Loader } from '@/components/common/Loader';
import { SettingForm } from '@/components/settings/SettingForm';

export const SettingsIndex = () => {
  // --- [ Hooks ] ---
  const { data: settings, isLoading } = useGetAllSettings();

  return (
    <Grid container spacing={2} component="form">
      <Grid item xs={12}>
        <Title>Configuraciones</Title>
      </Grid>
      {isLoading ? (
        <Loader />
      ) : (
        settings.map(setting => (
          <SettingForm key={setting.id} setting={setting} />
        ))
      )}
    </Grid>
  );
};
