/* eslint-disable no-unused-vars */
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

export function RadioField({ name, control, label, placeholder, type, readOnly, options }) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error, invalid }
  } = useController({
    name,
    control
  });
  // render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <FormControl component="fieldset" error={invalid}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur} row>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
      {/* <FormHelperText>{error?.message}</FormHelperText> */}
    </FormControl>
  );
}

RadioField.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.array
};

RadioField.defaultProps = {
  control: null,
  name: '',
  label: '',
  placeholder: '',
  type: '',
  options: []
};
