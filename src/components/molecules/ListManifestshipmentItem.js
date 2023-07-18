import { DeleteOutlined } from '@ant-design/icons';
import { Box, Button, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { InputField } from 'components/formField';
import { useWatch } from 'react-hook-form';
import { roundToCharge } from './PackageItem';

// ==============================|| INVOICE - ITEMS ||============================== //

const ListManifestShipmentItem = ({ onDeleteItem, index, control }) => {
  const deleteItemHandler = () => {
    onDeleteItem(index);
  };

  const watchField = useWatch({
    control,
    name: [`list_shipments.${index}`]
  });

  const grossWeightValue = Number(watchField[0].gross_weight);
  const volumeWeightValue = Number(watchField[0].volume_weight);
  const chargeWieght = grossWeightValue > volumeWeightValue ? roundToCharge(grossWeightValue) : roundToCharge(volumeWeightValue);

  return (
    <>
      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '90px' }}>{index + 1}</TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '200px' }}>
        <InputField control={control} name={`list_shipments.${index}.hawb`} type="text" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '200px' }}>
        <InputField control={control} name={`list_shipments.${index}.receiver_name`} type="text" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '200px' }}>
        <InputField control={control} name={`list_shipments.${index}.gross_weight`} type="number" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '200px' }}>
        <InputField control={control} name={`list_shipments.${index}.volume_weight`} type="number" />
      </TableCell>

      <TableCell>
        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
          <Box sx={{ pr: 2, pl: 2 }}>
            <Typography>{chargeWieght.toFixed(2)}</Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Remove Item">
          <Button color="error" onClick={deleteItemHandler}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </TableCell>
    </>
  );
};

ListManifestShipmentItem.propTypes = {
  onDeleteItem: PropTypes.func,
  index: PropTypes.number,
  control: PropTypes.any
};

export default ListManifestShipmentItem;
