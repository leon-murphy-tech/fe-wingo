import { Box, FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

export function SelectField({ name, control, label, options, size, helperText }) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error }
  } = useController({
    name,
    control
  });
  // render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        value={value}
        displayEmpty
        name={name}
        renderValue={(selected) => {
          if (!selected && options[0]?.value === '') {
            return <Box sx={{ color: 'grey.400' }}>{options[0].label}</Box>;
          }
          const option = options?.find((item) => item?.value === selected);

          return option?.label;
        }}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        size={size}
        error={error}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={option.value === '' ? true : false}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {helperText ? (
        <FormHelperText
          sx={{
            color: 'red',
            margin: 0
          }}
        >
          {error?.message}
        </FormHelperText>
      ) : (
        ''
      )}
    </FormControl>
  );
}

SelectField.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  size: PropTypes.string,
  options: PropTypes.array,
  helperText: PropTypes.bool
};

SelectField.defaultProps = {
  control: null,
  name: '',
  label: '',
  size: '',
  options: [],
  helperText: false
};
