import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import PackageItem, { roundToCharge } from 'components/molecules/PackageItem';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const getDataPackageInfo = (data) => {
  let packageData = [];
  data?.packageInfo?.forEach((item) => {
    const subweight = Number(item.quantity) * Number(item.weight).toFixed(2);
    const subvolume = ((Number(item.length) * Number(item.width) * Number(item.height)) / 5000).toFixed(2);
    const subcharge = subweight > subvolume ? roundToCharge(subweight) : roundToCharge(subvolume);

    const newItem = { ...item, subweight, subvolume, subcharge };
    packageData.push(newItem);
  });
  return packageData;
};

export function PackageInfomation({
  setStep,
  step,
  formValues,
  setFormValues,
  onConfirm,
  isEdit,
  editData,
  control,
  handleSubmit,
  getValues,
  watch
}) {
  const [hasSubmit, setHasSubmit] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'packageInfo'
  });

  const getAmount = (accumulator, currentValue) => {
    const subWeight = Number(currentValue.quantity) * Number(currentValue.weight);
    const subVolume = (Number(currentValue.length) * Number(currentValue.width) * Number(currentValue.height)) / 5000;

    const subCharge = subWeight > subVolume ? roundToCharge(subWeight) : roundToCharge(subVolume);

    return subCharge + accumulator;
  };

  const watchField = watch('packageInfo');

  const totalGrand = watchField?.reduce(getAmount, 0);

  useEffect(() => {
    if (editData && !hasSubmit && formValues?.packageInfo?.length === 0) {
      editData?.forEach((item) => {
        append({
          quantity: item?.quantity,
          type: item?.type,
          length: item?.length,
          width: item?.width,
          height: item?.height,
          weight: item?.weight
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    const dataFild = getValues();
    const packageData = getDataPackageInfo(dataFild);

    setFormValues({ ...formValues, packageInfo: [...packageData] });
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    const packageData = getDataPackageInfo(data);
    setFormValues({ ...formValues, packageInfo: [...packageData] });

    if (!isEdit) {
      onConfirm(packageData);
    } else {
      setStep(step + 1);
    }

    setHasSubmit(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MainCard boxShadow={true}>
          <Typography variant="h5" my={2}>
            Package Infomation
          </Typography>

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>qty</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>length</TableCell>
                  <TableCell>width</TableCell>
                  <TableCell>height</TableCell>
                  <TableCell>weight</TableCell>
                  <TableCell>subWeight</TableCell>
                  <TableCell>subVolume</TableCell>
                  <TableCell>subCharge</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields?.map((item, index) => (
                  <TableRow key={item.id}>
                    <PackageItem control={control} key={item.id} index={index} onDeleteItem={(index) => remove(index)} />
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
                      quantity: '',
                      type: '',
                      length: '',
                      width: '',
                      height: '',
                      weight: '',
                      subWeight: '',
                      subVolum: '',
                      subCharge: ''
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
                <Typography variant="subtitle1">{totalGrand.toFixed(2)}</Typography>
              </Stack>
            </Grid>
          </Grid>
          {/* {isEdit && (
            <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
              <Button variant="contained" sx={{ width: '200p' }} type="submit">
                <Typography variant="h6" color="white">
                  update
                </Typography>
              </Button>
            </Stack>
          )} */}
        </MainCard>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} spacing={10}>
          <Button startIcon={<LeftOutlined />} onClick={goBack}>
            <Typography variant="h6">Back</Typography>
          </Button>

          {!isEdit && (
            <Button variant="contained" endIcon={<RightOutlined />} sx={{ width: '200p' }} type="submit">
              <Typography variant="h6" color="white">
                Confirm
              </Typography>
            </Button>
          )}

          {isEdit && (
            <Button variant="contained" endIcon={<RightOutlined />} sx={{ width: '200p' }} type="submit">
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

PackageInfomation.propTypes = {
  setStep: PropTypes.func,
  step: PropTypes.number,
  setFormValues: PropTypes.func,
  formValues: PropTypes.object,
  onConfirm: PropTypes.func,
  isEdit: PropTypes.bool,
  editData: PropTypes.array,
  control: PropTypes.any,
  getValues: PropTypes.any,
  handleSubmit: PropTypes.func,
  watch: PropTypes.any
};
