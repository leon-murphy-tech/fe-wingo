import { useMutation, useQueryClient } from '@tanstack/react-query';
import userApi from 'api/userApi';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { openSnackbar } from 'store/reducers/snackbar';

const useAddUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  return useMutation(async (payload) => await userApi.add(payload), {
    onSuccess: () => {
      if (location.pathname === '/register') {
        navigation('/login');
      } else {
        navigation('/manage/allUser');
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
      queryClient.invalidateQueries({ queryKey: ['allUser'] });
    },
    onError: (error) => {
      dispatch(
        openSnackbar({
          open: true,
          message: error.message || 'Add new user failed',
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
};

export { useAddUser };
