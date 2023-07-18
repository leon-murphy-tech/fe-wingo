import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import ShipmentHistoryItem from 'components/molecules/ShipmentHistoryItem';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const getDataShipmentHistory = (data) => {
  let history = [];
  data?.shipmentHistory?.forEach((item) => {
    const date = dayjs(item?.date).format('YYYY-MM-DD');
    const newItem = { ...item, date };
    history.push(newItem);
  });
  return history;
};
export function ShipmentHistory({ setStep, step, formValues, setFormValues, onConfirm, editData, control, handleSubmit, getValues }) {
  const [hasSubmit, setHasSubmit] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shipmentHistory'
  });

  useEffect(() => {
    if (editData && !hasSubmit && formValues?.shipmentHistory?.length === 0) {
      editData?.forEach((item) => {
        append({
          date: dayjs(item?.created_at),
          status: item?.status,
          detail: item?.detail,
          location: item?.location
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    const dataField = getValues();
    const history = getDataShipmentHistory(dataField);
    setFormValues({ ...formValues, shipmentHistory: [...history] });
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    const history = getDataShipmentHistory(data);
    setFormValues({ ...formValues, shipmentHistory: [...history] });
    setHasSubmit(true);
    onConfirm(history);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MainCard>
          <Typography variant="h5" my={2}>
            Shipment History
          </Typography>

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>date</TableCell>
                  <TableCell>status</TableCell>
                  <TableCell>detail</TableCell>
                  <TableCell>location</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields?.map((item, index) => (
                  <TableRow key={item.id}>
                    <ShipmentHistoryItem
                      control={control}
                      key={item.id}
                      id={item.id}
                      index={index}
                      onDeleteItem={(index) => remove(index)}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container justifyContent="space-between">
            <Grid item xs={12} md={8}>
              <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}>
                <Button
                  color="primary"
                  startIcon={<PlusOutlined />}
                  onClick={() => {
                    append({ date: null, status: '', detail: '', location: '' });
                  }}
                  variant="dashed"
                  sx={{ bgcolor: 'transparent !important' }}
                >
                  Add Item
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} spacing={10}>
          <Button startIcon={<LeftOutlined />} onClick={goBack}>
            <Typography variant="h6">Back</Typography>
          </Button>
          <Button variant="contained" endIcon={<RightOutlined />} sx={{ width: '200p' }} type="submit">
            <Typography variant="h6" color="white">
              Update
            </Typography>
          </Button>
        </Stack>
      </form>
    </>
  );
}

ShipmentHistory.propTypes = {
  setStep: PropTypes.func,
  step: PropTypes.number,
  setFormValues: PropTypes.func,
  formValues: PropTypes.object,
  onConfirm: PropTypes.func,
  editData: PropTypes.array,
  control: PropTypes.any,
  getValues: PropTypes.any,
  handleSubmit: PropTypes.func
  // watch: PropTypes.any
};
