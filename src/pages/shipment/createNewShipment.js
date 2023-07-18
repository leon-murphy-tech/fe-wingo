import { CheckOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { useCreateshipment } from 'hooks/shipment/useCreateShipment';
import { useAuthentication } from 'hooks/useAuthentication';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PackageInfomation, ProductInfomation, SenderAndReceiverInfomation } from 'sections/shipment';
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
        email: yup.string().email().required(),
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
        email: yup.string().email().required(),
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
        description: yup.string().required(''),
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

export default function CreateNewShipment() {
  const theme = useTheme();
  const [step, setStep] = useState(0);
  const { userCurrentInfo } = useAuthentication();
  const [formValues, setFormValues] = useState({
    generalInfo: {
      shipment_type: '',
      service_id: '',
      reason_export: '',
      shipment_content: '',
      created_for: '',
      created_at: dayjs(),
      senderInfo: [
        {
          name: '',
          company: '',
          phone: '',
          email: '',
          // country: {value: "", label:},
          // addressLine1: {
          //   description: ''
          // },
          address_second: '',
          city: '',
          state: '',
          zipcode: ''
        }
      ],
      receiverInfo: [
        {
          name: '',
          company: '',
          phone: '',
          email: '',
          // country: {},
          // addressLine1: {},
          address_second: '',
          city: '',
          state: '',
          zipcode: ''
        }
      ]
    },
    productInfo: [
      {
        name: '',
        description: '',
        type: '',
        quantity: '',
        price: ''
      }
    ],
    packageInfo: [
      {
        quantity: '',
        type: '',
        length: '',
        width: '',
        height: '',
        weight: ''
      }
    ]
  });

  const { mutate } = useCreateshipment();

  const {
    control: controlForm1,
    handleSubmit: handleSubmitForm1,
    watch: watchForm1,
    setValue: setValueForm1
  } = useForm({
    defaultValues: { ...formValues.generalInfo, created_for: userCurrentInfo?.name },
    resolver: yupResolver(schemaForm1)
  });

  const {
    control: controlForm2,
    handleSubmit: handleSubmitForm2,
    watch: watchForm2,
    getValues: getValuesForm2
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
    getValues: getValuesForm3
  } = useForm({
    defaultValues: {
      packageInfo: formValues.packageInfo
    },
    resolver: yupResolver(schemaForm3)
  });

  const onConfirm = (lastChildData) => {
    const dataRaw = {
      shipment_method: 'AIR',
      shipment_type: formValues.generalInfo.shipmentType,
      date: dayjs(formValues.generalInfo.createdAt).format(),
      // reason_export: formValues.generalInfo.ReasonExport,
      reason_export: '111',
      service_id: formValues.generalInfo.service,
      shipment_content: formValues.generalInfo.content,
      sender_address: {
        ...formValues?.generalInfo?.senderInfo[0],
        country: formValues.generalInfo.senderInfo[0].country?.code,
        address_first: getAddressFromGGmaps(formValues.generalInfo?.senderInfo[0]?.address_first)
      },
      receiver_address: {
        ...formValues.generalInfo.receiverInfo[0],
        country: formValues.generalInfo.receiverInfo[0].country?.code,
        address_first: getAddressFromGGmaps(formValues.generalInfo.receiverInfo[0].address_first)
      },
      product_data: [...formValues.productInfo],
      package_data: [...lastChildData]
    };

    const form = new FormData();
    form.append('shipment_method', 'AIR');
    form.append('created_for', formValues.generalInfo?.created_for || userCurrentInfo?.uuid);
    form.append('shipment_type', formValues.generalInfo.shipment_type);
    form.append('reason_export', formValues.generalInfo.reason_export || 'none');
    form.append('service_id', formValues.generalInfo.service_id);
    form.append('sender_address', JSON.stringify(dataRaw?.sender_address));
    form.append('receiver_address', JSON.stringify(dataRaw?.receiver_address));
    form.append('product_data', JSON.stringify(dataRaw.product_data));
    form.append('package_data', JSON.stringify(dataRaw.package_data));
    form.append('shipment_content', formValues.generalInfo.shipment_content || 'none');
    form.append('localcode', 'test');
    form.append('localtracking', 'test');

    mutate(form);
  };

  return (
    <>
      <Stack spacing={2}>
        <MainCard content={false} boxShadow={true}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Tabs
                value={step}
                onChange={(e, newValue) => setStep(newValue)}
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
                    disabled={index > step}
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
                setValue={setValueForm1}
                control={controlForm1}
                handleSubmit={handleSubmitForm1}
                watch={watchForm1}
              />
            </TabPanel>
            <TabPanel value={step} index={1}>
              <ProductInfomation
                setStep={setStep}
                step={step}
                formValues={formValues}
                setFormValues={setFormValues}
                getValues={getValuesForm2}
                control={controlForm2}
                handleSubmit={handleSubmitForm2}
                watch={watchForm2}
              />
            </TabPanel>
            <TabPanel value={step} index={2}>
              <PackageInfomation
                setStep={setStep}
                step={step}
                formValues={formValues}
                setFormValues={setFormValues}
                onConfirm={onConfirm}
                isEdit={false}
                getValues={getValuesForm3}
                control={controlForm3}
                handleSubmit={handleSubmitForm3}
                watch={watchForm3}
              />
            </TabPanel>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
