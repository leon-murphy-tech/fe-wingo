/* eslint-disable no-unsafe-optional-chaining */
import { CheckOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from 'components/@extended/Avatar';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import { useGetShipmentDetail } from 'hooks/shipment/useGetShipmentDetail';
import { useUpdateShipment } from 'hooks/shipment/useUpdateShipment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import {
  PackageInfomation,
  ProductInfomation,
  SenderAndReceiverInfomation,
  getDataPackageInfo,
  getDataProductInfo
} from 'sections/shipment';
import { ShipmentHistory, getDataShipmentHistory } from 'sections/shipment/ShipmentHistory';
import { getAddressFromGGmaps } from 'utils';
import * as yup from 'yup';

export const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  minHeight: 'auto',
  minWidth: 250,
  padding: 16,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  textAlign: 'left',
  justifyContent: 'flex-start',
  '&:after': {
    backgroundColor: 'transparent !important'
  },

  '& > svg': {
    marginBottom: '0px !important',
    marginRight: 10,
    marginTop: 2,
    height: 20,
    width: 20
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 'auto'
  }
}));

// tabs option
const tabsOption = [
  {
    label: 'Sender & Reciever Infomation'
  },
  {
    label: 'Product Information'
  },
  {
    label: 'Package Information'
  },
  {
    label: 'Shipment History'
  }
];

// tabs
export function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const schemaForm1 = yup
  .object({
    shipment_type: yup.string().required('please select shipment type'),
    service_id: yup.string().required('please select service'),
    reason_export: yup.string().when('shipment_type', {
      is: 'WPX',
      then: yup.string().required('please select content')
    }),
    shipment_content: yup.string().when('shipment_type', {
      is: 'DOC',
      then: yup.string().required('please select content')
    }),
    created_for: yup.string().required(),

    senderInfo: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        company: yup.string().required(),
        phone: yup.string().required(),
        email: yup.string().email().notRequired(''),
        country: yup.object().required(),
        address_first: yup.lazy((value) => {
          switch (typeof value) {
            case 'object':
              return yup.object().required();
            case 'string':
              return yup.string().required();

            default:
              return yup.string().required();
          }
        }),
        city: yup.string().required(),
        state: yup.string().required(),
        zipcode: yup.string().required()
      })
    ),
    receiverInfo: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        company: yup.string().required(),
        phone: yup.string().required(),
        email: yup.string().email().notRequired(''),
        country: yup.object().required(),
        address_first: yup.lazy((value) => {
          switch (typeof value) {
            case 'object':
              return yup.object().required();
            case 'string':
              return yup.string().required();

            default:
              return yup.string().required();
          }
        }),
        city: yup.string().required(),
        state: yup.string().required(),
        zipcode: yup.string().required()
      })
    )
  })
  .required();

const schemaForm2 = yup
  .object({
    productInfo: yup.array().of(
      yup.object().shape({
        name: yup.string().required(''),
        description: yup.string().notRequired(''),
        type: yup.string().required(''),
        quantity: yup.string().required(''),
        price: yup.string().required('')
      })
    )
  })
  .required();

const schemaForm3 = yup
  .object({
    packageInfo: yup.array().of(
      yup.object().shape({
        quantity: yup.string().required(''),
        type: yup.string().required(''),
        length: yup.string().required(''),
        width: yup.string().required(''),
        height: yup.string().required(''),
        weight: yup.string().required('')
      })
    )
  })
  .required();

const schemaForm4 = yup
  .object({
    shipmentHistory: yup.array().of(
      yup.object().shape({
        date: yup.date().required(''),
        status: yup.string().required(''),
        detail: yup.string().required(''),
        location: yup.string().required('')
      })
    )
  })
  .required();

export default function EditShipment() {
  const { id } = useParams();
  const theme = useTheme();
  const [step, setStep] = useState(0);
  // const { userCurrentInfo } = useAuthentication();

  const { data: shipmentData, isLoading } = useGetShipmentDetail(id);
  const { mutate } = useUpdateShipment();

  // const roleAdmin = userCurrentInfo?.role === 'RL1' || userCurrentInfo?.role === 'RL2';

  const [formValues, setFormValues] = useState({
    generalInfo: {
      shipment_type: '',
      service_id: '',
      reason_export: '',
      shipment_content: '',
      created_for: '',
      senderInfo: [],
      receiverInfo: []
    },
    productInfo: [],
    packageInfo: [],
    shipmentHistory: []
  });

  const {
    control: controlForm1,
    handleSubmit: handleSubmitForm1,
    watch: watchForm1,
    setValue: setValueForm1,
    getValues: getValuesForm1,
    formState: { isValid: isValidForm1 }
  } = useForm({
    defaultValues: { ...formValues.generalInfo },
    resolver: yupResolver(schemaForm1)
  });

  const {
    control: controlForm2,
    handleSubmit: handleSubmitForm2,
    watch: watchForm2,
    getValues: getValuesForm2,
    formState: { isValid: isValidForm2 }
  } = useForm({
    defaultValues: {
      productInfo: formValues?.productInfo
    },
    resolver: yupResolver(schemaForm2)
  });

  const {
    control: controlForm3,
    handleSubmit: handleSubmitForm3,
    watch: watchForm3,
    getValues: getValuesForm3,
    formState: { isValid: isValidForm3 }
  } = useForm({
    defaultValues: {
      packageInfo: formValues.packageInfo
    },
    resolver: yupResolver(schemaForm3)
  });

  const {
    control: controlForm4,
    handleSubmit: handleSubmitForm4,
    getValues: getValuesForm4,
    formState: { isValid: isValidForm4 }
  } = useForm({
    defaultValues: formValues?.shipmentHistory,
    resolver: yupResolver(schemaForm4)
  });

  const onSubmit1 = () => {
    const dataForm1 = getValuesForm1();
    setFormValues({ ...formValues, generalInfo: dataForm1 });
  };

  const onSubmit2 = () => {
    const dataForm2 = getValuesForm2();
    const productData = getDataProductInfo(dataForm2);
    setFormValues({ ...formValues, productInfo: [...productData] });
  };

  const onSubmit3 = () => {
    const dataForm3 = getValuesForm3();
    const packageData = getDataPackageInfo(dataForm3);

    setFormValues({ ...formValues, packageInfo: [...packageData] });
  };

  const onSubmit4 = () => {
    const dataForm4 = getValuesForm4();
    const history = getDataShipmentHistory(dataForm4);
    setFormValues({ ...formValues, shipmentHistory: [...history] });
  };

  const productFromApi = shipmentData?.shipment_product_info?.map((item) => {
    const newItem = {
      name: item?.name,
      description: item?.description,
      type: item?.type,
      quantity: item?.quantity,
      price: item?.price,
      amount: item?.amnout
    };
    return newItem;
  });

  const packageFromApi = shipmentData?.shipment_package_info?.map((item) => {
    const newItem = {
      quantity: item?.quantity,
      type: item?.type,
      length: item?.length,
      width: item?.width,
      height: item?.height,
      weight: item?.weight,
      subweight: item?.subweight,
      subvolume: item?.subvolume,
      subcharge: item?.subcharge
    };
    return newItem;
  });

  const onConfirm = (lastChildData) => {
    const serviceAddress = {
      ...formValues?.generalInfo?.senderInfo[0],
      country: formValues.generalInfo.senderInfo[0].country?.code,
      address_first: getAddressFromGGmaps(formValues.generalInfo?.senderInfo[0]?.address_first)
    };

    const receiverAddress = {
      ...formValues.generalInfo.receiverInfo[0],
      country: formValues.generalInfo.receiverInfo[0].country.code,
      address_first: getAddressFromGGmaps(formValues.generalInfo.receiverInfo[0].address_first)
    };

    // const productInfo =
    const payload = new FormData();
    payload.append('shipment_method', 'AIR');
    payload.append('shipment_type', formValues.generalInfo.shipment_type);
    payload.append('reason_export', formValues.generalInfo.reason_export || 'none');
    payload.append('service_id', formValues.generalInfo.service_id);
    payload.append('sender_address', JSON.stringify(serviceAddress));
    payload.append('receiver_address', JSON.stringify(receiverAddress));
    payload.append('product_data', JSON.stringify(formValues?.productInfo?.length === 0 ? productFromApi : formValues?.productInfo));
    payload.append('package_data', JSON.stringify(formValues?.packageInfo?.length === 0 ? packageFromApi : formValues?.packageInfo));
    payload.append('shipment_history', JSON.stringify([...lastChildData]));
    payload.append('shipment_content', formValues.generalInfo.shipment_content || 'none');
    payload.append('created_for', formValues.generalInfo?.created_for);

    mutate({ payload, id });
  };

  const onTabChange = (newStep) => {
    if (step === 0) {
      handleSubmitForm1(onSubmit1)();

      if (isValidForm1) {
        setStep(newStep);
      }
    }

    if (step === 1) {
      handleSubmitForm2(onSubmit2)();
      if (isValidForm2) {
        setStep(newStep);
      }
    }

    if (step === 2) {
      handleSubmitForm3(onSubmit3)();
      if (isValidForm3) {
        setStep(newStep);
      }
    }

    if (step === 3) {
      handleSubmitForm4(onSubmit4)();
      if (isValidForm4) {
        setStep(newStep);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Stack spacing={2}>
          <MainCard content={false}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Tabs
                  value={step}
                  onChange={(e, newValue) => onTabChange(newValue)}
                  aria-label="icon label tabs example"
                  variant="scrollable"
                  sx={{
                    '& .MuiTabs-flexContainer': {
                      borderBottom: 'none'
                    },
                    '& .MuiTabs-indicator': {
                      display: 'none'
                    },
                    '& .MuiButtonBase-root + .MuiButtonBase-root': {
                      position: 'relative',
                      overflow: 'visible',
                      ml: 2,
                      '&:after': {
                        content: '""',
                        bgcolor: '#ccc',
                        width: 1,
                        height: 'calc(100% - 16px)',
                        position: 'absolute',
                        top: 8,
                        left: -8
                      }
                    }
                  }}
                >
                  {tabsOption.map((tab, index) => (
                    <StyledTab
                      theme={theme}
                      value={index}
                      // disabled={index > value}
                      key={index}
                      label={
                        <Grid container>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar type={index !== step ? 'combined' : 'filled'} size="xs" color={index > step ? 'secondary' : 'primary'}>
                              {index === step ? index + 1 : <CheckOutlined />}
                            </Avatar>
                            <Typography color={index > step ? 'textSecondary' : 'inherit'}>{tab.label}</Typography>
                          </Stack>
                        </Grid>
                      }
                    />
                  ))}
                </Tabs>
              </Grid>
            </Grid>
          </MainCard>

          <Grid container>
            <Grid item xs={12}>
              <TabPanel value={step} index={0}>
                <SenderAndReceiverInfomation
                  setStep={setStep}
                  step={step}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  editData={shipmentData?.shipment}
                  setValue={setValueForm1}
                  control={controlForm1}
                  handleSubmit={handleSubmitForm1}
                  watch={watchForm1}
                  // edit={true}
                />
              </TabPanel>
              <TabPanel value={step} index={1}>
                <ProductInfomation
                  setStep={setStep}
                  step={step}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  editData={shipmentData?.shipment_product_info}
                  control={controlForm2}
                  handleSubmit={handleSubmitForm2}
                  watch={watchForm2}
                  getValues={getValuesForm2}
                  // edit={true}
                />
              </TabPanel>
              <TabPanel value={step} index={2}>
                <PackageInfomation
                  setStep={setStep}
                  step={step}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  isEdit={true}
                  editData={shipmentData?.shipment_package_info}
                  control={controlForm3}
                  handleSubmit={handleSubmitForm3}
                  watch={watchForm3}
                  getValues={getValuesForm3}
                />
              </TabPanel>
              <TabPanel value={step} index={3}>
                <ShipmentHistory
                  setStep={setStep}
                  step={step}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  onConfirm={onConfirm}
                  editData={shipmentData?.shipment_history}
                  control={controlForm4}
                  handleSubmit={handleSubmitForm4}
                  getValues={getValuesForm4}
                  // watch={watchForm3}
                />
              </TabPanel>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
}
