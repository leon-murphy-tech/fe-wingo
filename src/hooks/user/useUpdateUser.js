import { useMutation, useQueryClient } from '@tanstack/react-query';
import userApi from 'api/userApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { openSnackbar } from 'store/reducers/snackbar';

const useUpdateUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ payload, id }) => {
      await userApi.update(payload, id);
    },
    {
      onSuccess: () => {
        navigation('/manage/allUser');
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
            message: error.message || 'update user failed',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      }
    }
  );
};

export { useUpdateUser };
