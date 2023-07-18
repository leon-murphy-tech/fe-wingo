import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

export function InputField({ name, control, label, placeholder, type, readOnly, disabled }) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  // render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <TextField
      fullWidth
      // margin="normal"
      autoComplete="off"
      name={name}
      value={value}
      onChange={(e) => {
        e.preventDefault();
        const v = e.target.value;
        if (type === 'number') {
          if (!Number.isInteger(Number(v))) {
            const decimal = v.split('.')[1]?.length;
            if (decimal > 2) {
              return;
            } else {
              onChange(v);
            }
          } else {
            onChange(v);
          }
        } else {
          onChange(v);
        }
      }}
      disabled={disabled}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      label={label}
      placeholder={placeholder}
      sx={{
        '&>label': {
          padding: '0px 0px 1px'
        }
      }}
      type={type}
      inputProps={{
        ...(type === 'number' && { min: 0 }),
        step: 'any',
        readOnly: readOnly
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
    />
  );
}

InputField.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool
};

InputField.defaultProps = {
  control: null,
  name: '',
  label: '',
  placeholder: '',
  type: '',
  readOnly: false,
  disabled: false
};
