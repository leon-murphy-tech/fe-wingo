import PropTypes from 'prop-types';

// material-ui
import { Button, TableCell, Tooltip } from '@mui/material';
// assets
import { DeleteOutlined } from '@ant-design/icons';

import { DateTimeField, InputField, SelectField } from 'components/formField';

// ==============================|| INVOICE - ITEMS ||============================== //

const ShipmentHistoryItem = ({ onDeleteItem, index, control }) => {
  const deleteItemHandler = () => {
    onDeleteItem(index);
  };

  const optionsType = [
    { value: '', label: 'Select Type' },
    { value: 'pending', label: 'Pending' },
    { value: 'pickup', label: 'Pickup' },
    { value: 'in_transit', label: 'Transit' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancel', label: 'Cancel' }
  ];

  return (
    <>
      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '200px' }}>
        <DateTimeField control={control} name={`shipmentHistory.${index}.date`} />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '200px' }}>
        <SelectField control={control} name={`shipmentHistory.${index}.status`} options={optionsType} />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '200px' }}>
        <InputField control={control} name={`shipmentHistory.${index}.detail`} type="text" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '200px' }}>
        <InputField control={control} name={`shipmentHistory.${index}.location`} type="text" />
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

ShipmentHistoryItem.propTypes = {
  onDeleteItem: PropTypes.func,
  index: PropTypes.number,
  control: PropTypes.any
};

export default ShipmentHistoryItem;
