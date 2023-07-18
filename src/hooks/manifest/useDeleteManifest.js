import { useMutation, useQueryClient } from '@tanstack/react-query';
import manifestApi from 'api/manifest';
import { useDispatch } from 'react-redux';

import { openSnackbar } from 'store/reducers/snackbar';

const useDeteteManifest = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  return useMutation(async (id) => await manifestApi.remove(id), {
    onSuccess: () => {
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
      queryClient.invalidateQueries({ queryKey: ['manifest'] });
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

export { useDeteteManifest };
