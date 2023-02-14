import { Box } from '@/components/common/Box';
import Grid from '@mui/material/Grid';
import SubTitle from '@/components/common/SubTitle';
import Typography from '@mui/material/Typography';
import { Switch } from '@/components/common/Inputs/Switch';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import SettingsApi from '@/api/SettingsApi';

export const SettingForm = ({ setting }) => {
  const { control, handleSubmit } = useForm();
  const { isLoading } = useMutation(['setting'], SettingsApi.create);

  // --- [Handlers] ---
  const onSubmit = data => {
    data.name = setting.name;
    // console.log(data);
  };

  return (
    <Grid item xs={12} key={setting.id}>
      <Box isLoading={isLoading}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <SubTitle>{setting.label}</SubTitle>
            <Typography variant="body1">{setting.description}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch
              control={control}
              labelText="Permitir"
              name="is_enabled"
              labelPlacement="start"
              onClick={handleSubmit(onSubmit)}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
