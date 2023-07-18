import { useMutation, useQueryClient } from '@tanstack/react-query';
import adddressBookApi from 'api/addressBookApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { openSnackbar } from 'store/reducers/snackbar';

const useRemoveAddress = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(async (payload) => await adddressBookApi.remove(payload), {
    onSuccess: () => {
      navigation('/addressBook');
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
      queryClient.invalidateQueries({ queryKey: ['addressBook'] });
    },
    onError: (error) => {
      dispatch(
        openSnackbar({
          open: true,
          message: error.message || 'remove your address failed',
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

export { useRemoveAddress };
