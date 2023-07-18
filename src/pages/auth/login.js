/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import { useAuthentication } from 'hooks/useAuthentication';
import AuthWrapper from 'sections/auth/AuthWrapper';
import LoginForm from 'sections/auth/loginForm';

// ================================|| LOGIN ||================================ //

const Login = () => {
  const { loginUser, loginError, isLoggedIn } = useAuthentication();

  const handleSubmit = (payload) => {
    loginUser(payload);
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/register' : '/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {/* <AuthLogin /> */}
          <LoginForm onSubmitLogin={handleSubmit} loginError={loginError} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
