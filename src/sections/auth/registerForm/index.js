import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, Link, Stack, Typography } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { InputField, PasswordField } from 'components/formField';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// ============================|| FIREBASE - REGISTER ||============================ //

import { yupResolver } from '@hookform/resolvers/yup';
import { useAddUser } from 'hooks/user/useAddUser';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().required('').email('please enter email valid'),
    password: yup.string().required('please enter password'),
    name: yup.string().required(),
    company: yup.string().required()
  })
  .required();

const RegisterForm = () => {
  const { mutate, isLoading } = useAddUser();

  const [level, setLevel] = useState();
  const [checked, setChecked] = useState(false);

  const { handleSubmit, control, watch } = useForm({
    defaultValue: {
      name: '',
      company: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const watchPassword = watch('password');

  const changePassword = useCallback(() => {
    const temp = strengthIndicator(watchPassword);
    setLevel(strengthColor(temp));
  }, [watchPassword]);

  useEffect(() => {
    changePassword();
  }, [changePassword]);

  const onConfirmCreate = (formValue) => {
    const formBody = new FormData();
    formBody.append('name', formValue.name);
    formBody.append('company', formValue.company);
    formBody.append('email', formValue.email);
    formBody.append('password', formValue.password);
    formBody.append('role', 'RL3');

    mutate(formBody);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onConfirmCreate)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="firstname-signup">Full Name*</InputLabel>

              <InputField name="name" control={control} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="company-signup">Company Name</InputLabel>

              <InputField name="company" control={control} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-signup">Email Address*</InputLabel>

              <InputField name="email" control={control} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-signup">Password</InputLabel>
              <PasswordField name="password" control={control} />
            </Stack>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
              label={
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={12}>
            <AnimateButton>
              <Button disableElevation disabled={isLoading} fullWidth size="large" type="submit" variant="contained" color="primary">
                Create Account
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RegisterForm;
