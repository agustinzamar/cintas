import MuiBox from '@mui/material/Box';
import { TextField } from '@/components/common/Inputs/TextField';
import { CheckBox } from '@/components/common/Inputs/CheckBox';
import { useEffect } from 'react';

export const SizePicker = ({ control, watch, sizeNumber, reset }) => {
  const checkboxName = `size_${sizeNumber}`;
  const inputName = `quantity_${sizeNumber}`;

  const checkboxValue = watch(checkboxName);

  useEffect(() => {
    reset(inputName);
  }, [checkboxValue]);

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
        name={checkboxName}
        labelText={String(sizeNumber)}
        labelPlacement="end"
      />
      <TextField
        type="number"
        control={control}
        name={inputName}
        labelText="Cantidad"
        fullWidth={false}
        sx={{ marginLeft: '1rem' }}
        disabled={!checkboxValue}
      />
    </MuiBox>
  );
};
