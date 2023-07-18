import { Grid, InputLabel, Stack } from '@mui/material';
import { CountryField, DateTimeField, InputField, SelectField } from 'components/formField';
import PropTypes from 'prop-types';

export function HeaderManifestFrom({ control }) {
  const optionsStatus = [
    { value: '', label: 'Select Type' },
    { value: 'departed', label: 'Departed' }
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Stack spacing={1}>
          <InputLabel>Date</InputLabel>
          <DateTimeField control={control} name="date" />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Stack spacing={1}>
          <InputLabel>Airway Bill Number</InputLabel>
          <InputField control={control} name="airway_bill_number" />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Stack spacing={1}>
          <InputLabel>Airline</InputLabel>

          <InputField control={control} name="airline" />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Stack spacing={1}>
          <InputLabel>Country</InputLabel>
          <CountryField control={control} name="country" />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Stack spacing={1}>
          <InputLabel>Status</InputLabel>
          <SelectField control={control} name="status" options={optionsStatus} />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Stack spacing={1}>
          <InputLabel>Total HAWB</InputLabel>
          <InputField control={control} name="total_hawb" />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Stack spacing={1}>
          <InputLabel>Total Gross Weight</InputLabel>
          <InputField control={control} name="total_gross_weight" />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Stack spacing={1}>
          <InputLabel>Total Charge Weight</InputLabel>
          <InputField control={control} name="total_charge_weight" />
        </Stack>
      </Grid>
    </Grid>
  );
}

HeaderManifestFrom.propTypes = {
  control: PropTypes.any
};
