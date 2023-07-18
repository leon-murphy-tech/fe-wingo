import { useMutation, useQueryClient } from '@tanstack/react-query';
import manifestApi from 'api/manifest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { openSnackbar } from 'store/reducers/snackbar';

const useAddManifest = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(async (payload) => await manifestApi.add(payload), {
    onSuccess: () => {
      navigation('/shipment/manifestShipment/all');
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
          message: error.message || 'create manifest failed',
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

export { useAddManifest };
