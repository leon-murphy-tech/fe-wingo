import { Link } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';

import AuthWrapper from 'sections/auth/AuthWrapper';
import RegisterForm from 'sections/auth/registerForm';
import { useAuthentication } from 'hooks/useAuthentication';

// ================================|| REGISTER ||================================ //

const Register = () => {
  const { isLoggedIn } = useAuthentication();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Sign up</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/login' : '/login'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Already have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <RegisterForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Register;
