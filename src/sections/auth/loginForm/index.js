import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, FormHelperText, Grid, InputLabel, Link, Stack, Typography } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

import { InputField, PasswordField } from 'components/formField';
import { useForm } from 'react-hook-form';

// ============================|| FIREBASE - LOGIN ||============================ //

import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthentication } from 'hooks/useAuthentication';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().required('').email('please enter email valid'),
    password: yup.string().required('please enter password')
  })
  .required();

const LoginForm = ({ onSubmitLogin, loginError }) => {
  const { isLoggedIn } = useAuthentication();
  const [checked, setChecked] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    defaultValue: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (formValue) => {
    onSubmitLogin(formValue);
  };

  useEffect(() => {
    if (loginError) {
      setError('password', { type: 'custom', message: 'password inccorect' });
      setError('email', { type: 'custom', message: 'password inccorect' });
    }
  }, [loginError, setError]);

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <InputField name="email" control={control} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <PasswordField name="password" control={control} />
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="h6">Keep me sign in</Typography>}
              />
              <Link variant="h6" component={RouterLink} to={isLoggedIn ? '/auth/forgot-password' : '/forgot-password'} color="text.primary">
                Forgot Password?
              </Link>
            </Stack>
          </Grid>
          {errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                Login
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
LoginForm.propTypes = {
  onSubmitLogin: PropTypes.func,
  loginError: PropTypes.object
};
