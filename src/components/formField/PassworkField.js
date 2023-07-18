import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useController } from 'react-hook-form';
import { InputAdornment, OutlinedInput, Typography } from '@mui/material';
import IconButton from 'components/@extended/IconButton';

export function PasswordField({ control, name }) {
  const [capsWarning, setCapsWarning] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  const {
    field: { onChange, onBlur, value },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <>
      <OutlinedInput
        fullWidth
        color={capsWarning ? 'warning' : 'primary'}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              color="secondary"
            >
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </IconButton>
          </InputAdornment>
        }
        //   disabled={disabled}
        name={name}
        error={error}
        value={value}
        onChange={onChange}
        onBlur={(event) => {
          setCapsWarning(false);
          onBlur(event);
        }}
        onKeyDown={onKeyDown}
      />
      {capsWarning && (
        <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-password-login">
          Caps lock on!
        </Typography>
      )}
    </>
  );
}

PasswordField.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string.isRequired
  // label: PropTypes.string,
  // placeholder: PropTypes.string,
  // type: PropTypes.string
};
