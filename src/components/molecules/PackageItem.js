import PropTypes from 'prop-types';
import { Box, Button, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';
import { InputField, SelectField } from 'components/formField';
import { useWatch } from 'react-hook-form';

// ==============================|| INVOICE - ITEMS ||============================== //

export function roundToHaft(num) {
  if (num > 0.5) return 1;
  else {
    if (num === 0) {
      return 0;
    } else return 0.5;
  }
}

export function roundToCharge(number) {
  if (number < 1) {
    return roundToHaft(number);
  } else {
    let remainder = number % 1;
    let roundRemaider = roundToHaft(remainder);
    return Math.floor(number) + roundRemaider;
  }
}

const PackageItem = ({ onDeleteItem, index, control }) => {
  const deleteItemHandler = () => {
    onDeleteItem(index);
  };

  const watchField = useWatch({
    control,
    name: [`packageInfo.${index}`]
  });

  const subweight = Number(watchField[0].quantity) * Number(watchField[0].weight);
  const subvolume = (Number(watchField[0].length) * Number(watchField[0].width) * Number(watchField[0].height)) / 5000;

  const subCharge = subweight > subvolume ? roundToCharge(subweight) : roundToCharge(subvolume);

  const optionsType = [
    { value: '', label: 'Select Type' },
    { value: 'PCS', label: 'PCS' },
    { value: 'BOX', label: 'BOX' },
    { value: 'PALLET', label: 'PALLET' }
  ];
  return (
    <>
      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '90px' }}>
        <InputField control={control} name={`packageInfo.${index}.quantity`} type="number" />
      </TableCell>
      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '130px' }}>
        <SelectField control={control} name={`packageInfo.${index}.type`} options={optionsType} />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '130px' }}>
        <InputField control={control} name={`packageInfo.${index}.length`} type="text" placeholder="length (cm)" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '130px' }}>
        <InputField control={control} name={`packageInfo.${index}.width`} type="text" placeholder="width (cm)" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '130px' }}>
        <InputField control={control} name={`packageInfo.${index}.height`} type="text" placeholder="height (cm)" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '130px' }}>
        <InputField control={control} name={`packageInfo.${index}.weight`} type="text" placeholder="weight (kg)" />
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '90px' }}>
        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
          <Box sx={{ pr: 2, pl: 2 }}>
            <Typography>{subweight.toFixed(2)}</Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '90px' }}>
        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
          <Box sx={{ pr: 2, pl: 2 }}>
            <Typography>{subvolume.toFixed(2)}</Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 }, minWidth: '90px' }}>
        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
          <Box sx={{ pr: 2, pl: 2 }}>
            <Typography>{subCharge.toFixed(2)}</Typography>
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

PackageItem.propTypes = {
  onDeleteItem: PropTypes.func,
  index: PropTypes.number,
  control: PropTypes.any
};

export default PackageItem;
