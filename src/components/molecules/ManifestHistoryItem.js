import PropTypes from 'prop-types';
import { Button, TableCell, Tooltip } from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';
import { DateTimeField, InputField } from 'components/formField';

// ==============================|| INVOICE - ITEMS ||============================== //

const ManifestHistoryItem = ({ onDeleteItem, index, control }) => {
  const deleteItemHandler = () => {
    onDeleteItem(index);
  };

  return (
    <>
      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, width: '90px' }}>{index + 1}</TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '200px' }}>
        <DateTimeField control={control} name={`Manifest_history.${index}.date`} />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '200px' }}>
        <InputField control={control} name={`Manifest_history.${index}.flight`} type="text" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '200px' }}>
        <InputField control={control} name={`Manifest_history.${index}.detail`} type="text" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '200px' }}>
        <InputField control={control} name={`Manifest_history.${index}.location`} type="text" />
      </TableCell>

      <TableCell align="center">
        <Tooltip title="Remove Item">
          <Button color="error" onClick={deleteItemHandler}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </TableCell>
    </>
  );
};

ManifestHistoryItem.propTypes = {
  onDeleteItem: PropTypes.func,
  index: PropTypes.number,
  control: PropTypes.any
};

export default ManifestHistoryItem;
