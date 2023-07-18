import { useMutation } from '@tanstack/react-query';
import authApi from 'api/authApi';
import userApi from 'api/userApi';

import { StorageKeys } from 'constants';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from 'store/reducers/authUser';
import { openSnackbar } from 'store/reducers/snackbar';

export function useAuthentication() {
  const dispatch = useDispatch();
  const { isLoggedIn, user: userCurrentInfo } = useSelector((state) => state.authUser);

  const { mutate: loginUser, error: loginError } = useMutation(async (payload) => await authApi.login(payload), {
    onSuccess: async (data) => {
      localStorage.setItem(StorageKeys.TOKEN, data.token);

      try {
        const getUser = await userApi.getCurrentUser();
        dispatch(
          login({
            isLoggedIn: true,
            user: getUser
          })
        );
      } catch (error) {
        console.log('not get user', error);
      }

      dispatch(
        openSnackbar({
          open: true,
          message: 'successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    },
    onError: () => {
      dispatch(
        openSnackbar({
          open: true,
          message: 'account or password is incorrect',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  });

  const { mutate: logoutUser } = useMutation(async () => await authApi.logout(), {
    onSuccess: (data) => {
      localStorage.removeItem(StorageKeys.TOKEN);

      dispatch(logout());
      dispatch(
        openSnackbar({
          open: true,
          message: data.message,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    },
    onError: (error) => {
      dispatch(
        openSnackbar({
          open: true,
          message: error.message,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  });

  return { loginUser, isLoggedIn, logoutUser, loginError, userCurrentInfo };
}
