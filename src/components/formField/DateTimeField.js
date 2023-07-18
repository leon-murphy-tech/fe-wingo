/* eslint-disable no-unused-vars */

import { FormControl, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';

export function DateTimeField({ control, name }) {
  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <FormControl sx={{ width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          inputFormat="dd/MM/yyyy"
          value={value}
          ref={ref}
          renderInput={(params) => <TextField {...params} size="small" error={!!error} name={name} />}
          onChange={(v) => {
            onChange(v);
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

DateTimeField.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string
};

DateTimeField.defaultProps = {
  control: null,
  name: ''
};
