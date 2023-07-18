import PropTypes from 'prop-types';
import { Box, Button, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';
import { InputField, SelectField } from 'components/formField';
import { useWatch } from 'react-hook-form';

// ==============================|| INVOICE - ITEMS ||============================== //

const InvoiceItem = ({ onDeleteItem, index, control }) => {
  const deleteItemHandler = () => {
    onDeleteItem(index);
  };

  const unitQty = useWatch({
    control,
    name: `productInfo.${index}.quantity`
  });

  const unitPrice = useWatch({
    control,
    name: `productInfo.${index}.price`
  });

  const unitAmount = unitQty * unitPrice;

  const optionsType = [
    { value: '', label: 'Select Type' },
    { value: 'PCS', label: 'PCS' },
    { value: 'BOX', label: 'BOX' },
    { value: 'PALLET', label: 'PALLET' }
  ];
  return (
    <>
      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '200px' }}>
        <InputField control={control} name={`productInfo.${index}.name`} placeholder="item name" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '200px' }}>
        <InputField control={control} name={`productInfo.${index}.description`} placeholder="Description" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '200px' }}>
        <SelectField control={control} name={`productInfo.${index}.type`} options={optionsType} />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '200px' }}>
        <InputField control={control} name={`productInfo.${index}.quantity`} type="number" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '200px' }}>
        <InputField control={control} name={`productInfo.${index}.price`} type="number" />
      </TableCell>

      <TableCell>
        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
          <Box sx={{ pr: 2, pl: 2 }}>
            <Typography>{unitAmount.toFixed(2)}</Typography>
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

InvoiceItem.propTypes = {
  onDeleteItem: PropTypes.func,
  index: PropTypes.number,
  control: PropTypes.any
};

export default InvoiceItem;
