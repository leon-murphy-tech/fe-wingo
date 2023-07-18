// material-ui
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import InvoiceItem from 'components/molecules/InvoiceItem';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const getDataProductInfo = (data) => {
  let productData = [];
  data?.productInfo?.forEach((item) => {
    const amount = Number(item.quantity) * Number(item.price);
    const newItem = { ...item, amount: amount };
    productData.push(newItem);
  });

  return productData;
};
export function ProductInfomation({ setStep, step, formValues, setFormValues, editData, edit, control, handleSubmit, getValues, watch }) {
  const [hasSubmit, setHasSubmit] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productInfo'
  });

  const getAmount = (accumulator, currentValue) => {
    const quantity = currentValue.quantity;
    const price = currentValue.price;
    const amount = Number(quantity) * Number(price);
    return amount + accumulator;
  };

  const watchField = watch('productInfo');
  const totalGrand = watchField?.reduce(getAmount, 0);

  useEffect(() => {
    if (editData && !hasSubmit && formValues?.productInfo.length === 0) {
      editData?.forEach((item) => {
        append({
          name: item?.name,
          description: item?.description,
          type: item?.type,
          quantity: item?.quantity,
          price: item?.price
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    const dataField = getValues();
    const productData = getDataProductInfo(dataField);
    setFormValues({ ...formValues, productInfo: [...productData] });
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    const productData = getDataProductInfo(data);
    setStep(step + 1);
    setFormValues({ ...formValues, productInfo: [...productData] });
    setHasSubmit(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <MainCard boxShadow={true}>
          <Typography variant="h5" my={2}>
            Product Infomation
          </Typography>

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields?.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <InvoiceItem control={control} key={item.id} index={index} onDeleteItem={(index) => remove(index)} />
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
                    append({
                      name: '',
                      description: '',
                      type: '',
                      quantity: '',
                      price: ''
                    });
                  }}
                  variant="dashed"
                  sx={{ bgcolor: 'transparent !important' }}
                >
                  Add Item
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ pt: 2.5, pb: 2.5 }}>
              <Stack direction="row" justifyContent="center" spacing={5}>
                <Typography variant="subtitle1">Grand Total:</Typography>
                <Typography variant="subtitle1">{totalGrand?.toFixed(2)}</Typography>
              </Stack>
            </Grid>
          </Grid>
          {edit && (
            <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
              <Button variant="contained" sx={{ width: '200p' }} type="submit">
                <Typography variant="h6" color="white">
                  update
                </Typography>
              </Button>
            </Stack>
          )}
        </MainCard>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} spacing={10}>
          <Button startIcon={<LeftOutlined />} onClick={goBack}>
            <Typography variant="h6">Back</Typography>
          </Button>
          {!edit && (
            <Button variant="contained" endIcon={<RightOutlined />} sx={{ width: '200p' }} type="submit">
              <Typography variant="h6" color="white">
                Next
              </Typography>
            </Button>
          )}
          {edit && (
            <Button variant="contained" endIcon={<RightOutlined />} sx={{ width: '200p' }} onClick={() => setStep(step + 1)}>
              <Typography variant="h6" color="white">
                Next
              </Typography>
            </Button>
          )}
        </Stack>
      </form>
    </>
  );
}

ProductInfomation.propTypes = {
  setStep: PropTypes.func,
  step: PropTypes.number,
  setFormValues: PropTypes.func,
  formValues: PropTypes.object,
  editData: PropTypes.array,
  edit: PropTypes.bool,
  control: PropTypes.any,
  getValues: PropTypes.any,
  handleSubmit: PropTypes.func,
  watch: PropTypes.any
};
