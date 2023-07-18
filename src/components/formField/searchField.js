/* eslint-disable react/prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';

// import { debounce } from 'lodash';
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
// import { useController } from 'react-hook-form';

export const SearchField = ({ size }) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  //   const delayedQuery = useCallback(() => {
  //     debounce(onChange, 500);
  //   }, []);

  //   useEffect(() => {
  //     delayedQuery();
  //     return delayedQuery.cancel;
  //   }, [value, delayedQuery]);

  // const {
  //   field: { onChange, onBlur, value, ref },
  //   fieldState: { error }
  // } = useController({
  //   name,
  //   control
  // });

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
        <OutlinedInput
          size={size}
          id="header-search"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight'
          }}
          placeholder="search"
          // name={name}
          value={value}
          onChange={onChange}
          // onBlur={onBlur}
          // inputRef={ref}
          // error={!!error}
          // helperText={error?.message}
        />
      </FormControl>
    </Box>
  );
};

SearchField.propTypes = {
  size: PropTypes.string
};

SearchField.defaultProps = {
  size: ''
};
