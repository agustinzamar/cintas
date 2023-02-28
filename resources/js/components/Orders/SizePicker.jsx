import MuiBox from '@mui/material/Box';
import { TextField } from '@/components/common/Inputs/TextField';
import { CheckBox } from '@/components/common/Inputs/CheckBox';

export const SizePicker = ({ control, watch, size }) => {
  const value = watch(`size_${size}`);

  return (
    <MuiBox
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <CheckBox
        control={control}
        name={`size_${size}`}
        labelText={String(size)}
        labelPlacement="end"
      />
      <TextField
        type="number"
        control={control}
        name={`quantity_${size}`}
        labelText="Cantidad"
        fullWidth={false}
        sx={{ marginLeft: '1rem' }}
        disabled={!value}
      />
    </MuiBox>
  );
};
