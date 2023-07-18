import { useMutation, useQueryClient } from '@tanstack/react-query';
import shipmentApi from 'api/shipmentApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { openSnackbar } from 'store/reducers/snackbar';

const useUpdateShipment = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ payload, id }) => {
      await shipmentApi.update(payload, id);
    },
    {
      onSuccess: (data) => {
        navigation('/shipment/allShipment');
        dispatch(
          openSnackbar({
            open: true,
            message: data?.message || 'successfuly',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        queryClient.invalidateQueries({ queryKey: ['shipments'] });
      },
      onError: (error) => {
        dispatch(
          openSnackbar({
            open: true,
            message: error.message || 'updated shipment failed',
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

export { useUpdateShipment };
