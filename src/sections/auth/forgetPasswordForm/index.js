/* eslint-disable no-unused-vars */
// material-ui
import { Button, Grid, InputLabel, Stack, Typography } from '@mui/material';

// third party

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { InputField } from 'components/formField';
import { useForm } from 'react-hook-form';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const ForgotPasswordForm = () => {
  //   const { isLoggedIn, resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValue: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  return (
    <>
      <form noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
              <InputField name="email" control={control} />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mb: -2 }}>
            <Typography variant="caption">Do not forgot to check SPAM box.</Typography>
          </Grid>
          <Grid item xs={12}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                Send Password Reset Email
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
