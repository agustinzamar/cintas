import { FormControl, InputLabel, MenuItem } from '@mui/material';
import MuiSelect from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import { useId } from 'react';
import PropTypes from 'prop-types';

function renderItems(data = []) {
  return data.map(item => (
    <MenuItem value={item.id} key={item.id}>
      {item.name ? item.name : item.label}
    </MenuItem>
  ));
}

export const Select = ({
  control,
  data,
  name,
  labelText = '',
  required = false,
  render,
  disabled = false,
  ...rest
}) => {
  const labelId = useId();
  const renderFunction = render || renderItems;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId} required={required}>
        {labelText}
      </InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <MuiSelect
            required={required}
            labelId={labelId}
            label={labelText}
            onBlur={onBlur}
            onChange={onChange}
            inputRef={ref}
            value={value || ''}
            name={name}
            disabled={disabled}
            {...rest}
          >
            {data.length > 0 && renderFunction(data)}
          </MuiSelect>
        )}
      />
    </FormControl>
  );
};

Select.propTypes = {
  control: PropTypes.object.isRequired,
  data: PropTypes.array,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  createOption: PropTypes.func,
};

Select.defaultProps = {
  data: [],
};
