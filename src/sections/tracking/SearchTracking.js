import { useTheme } from '@emotion/react';
import { Button, Grid, InputBase, Stack } from '@mui/material';
import { blue } from '@mui/material/colors';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

export function SearchTracking({ onChange }) {
  const theme = useTheme();
  // const {
  //   field: { onChange, onBlur, value }
  // } = useController({
  //   name,
  //   control
  // });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    onChange(data.track);
  };

  return (
    <MainCard>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={7}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={0.5} direction="row" justifyContent="center" alignItems="center">
              <InputBase
                placeholder="Enter Your Shipment ID"
                fullWidth
                sx={{
                  background: blue[50],
                  padding: '4px 18px'
                }}
                {...register('track')}
              />
              <Button variant="contained" sx={{ background: theme.palette.primary.dark }} type="submit">
                Track
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </MainCard>
  );
}

SearchTracking.propTypes = {
  onChange: PropTypes.func
};
