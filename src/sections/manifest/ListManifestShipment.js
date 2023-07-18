// material-ui
import { PlusOutlined } from '@ant-design/icons';
import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ListManifestShipmentItem from 'components/molecules/ListManifestshipmentItem';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';

export function ListManifestShipment({ control, isEdit }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'list_shipments'
  });

  return (
    <>
      <Typography variant="h5" my={2}>
        List Shipment
      </Typography>

      <TableContainer sx={{ maxHeight: '320px', overflowY: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>HAWB</TableCell>
              <TableCell>ReceiverName</TableCell>
              <TableCell>Gross Wight</TableCell>
              <TableCell>Volume Weight</TableCell>
              <TableCell align="right">Charge Weight</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((item, index) => (
              <TableRow key={item.id}>
                <ListManifestShipmentItem control={control} key={item.id} index={index} onDeleteItem={(index) => remove(index)} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="space-between" mt={1}>
        <Grid item xs={12} md={8}>
          <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}>
            <Button
              color="primary"
              startIcon={<PlusOutlined />}
              onClick={() => {
                append({ hawb: '', receiver_name: '', gross_weight: '', volume_weight: '' });
              }}
              variant="dashed"
              sx={{ bgcolor: 'transparent !important' }}
            >
              Add Item
            </Button>
          </Box>
        </Grid>

        {!isEdit ? (
          <Grid item xs={12} md={4} sx={{ pt: 2.5, pb: 2.5 }}>
            <Stack direction="row" justifyContent="center" spacing={5}>
              <Button variant="outlined" color="secondary" sx={{ alignSelf: 'flex-start' }}>
                <Typography variant="h6" color="textPrimary">
                  cancel
                </Typography>
              </Button>

              <Button variant="contained" sx={{ width: '200p' }} type="submit">
                <Typography variant="h6" color="white">
                  create & send
                </Typography>
              </Button>
            </Stack>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    </>
  );
}

ListManifestShipment.propTypes = {
  control: PropTypes.any,
  isEdit: PropTypes.bool,
  data: PropTypes.array
};
