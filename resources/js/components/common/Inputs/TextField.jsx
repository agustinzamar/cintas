import { FormControl } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

export const TextField = ({
  control,
  name,
  labelText = '',
  required,
  fullWidth = true,
  disabled = false,
  ...rest
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <MuiTextField
            required={required}
            label={labelText}
            onBlur={onBlur}
            onChange={onChange}
            inputRef={ref}
            value={value || ''}
            name={name}
            disabled={disabled}
            {...rest}
          />
        )}
      />
    </FormControl>
  );
};

TextField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
};
