import { Autocomplete, Box, FormControl, TextField, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { countriesList } from 'utils';

export function CountryField({ name, control }) {
  const theme = useTheme();
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  // render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <FormControl fullWidth>
      <Autocomplete
        name={name}
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        autoComplete
        options={countriesList}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              error={error}
              placeholder="Select Country"
              sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
            />
          );
        }}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
      />
    </FormControl>
  );
}

CountryField.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool
};

CountryField.defaultProps = {
  control: null,
  name: '',
  readOnly: ''
};
