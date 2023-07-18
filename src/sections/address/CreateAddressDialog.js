import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, Tooltip, Typography } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import AlertColumnDelete from 'components/Alert/AlertColumnDelete';
import { CountryField, InputField, RadioField } from 'components/formField';
import GoogleMaps from 'components/formField/GoogleMap';
import { useCreateAddress } from 'hooks/addressBook/useCreatAddress';
import { useUpdateAddress } from 'hooks/addressBook/useUpdateAddress';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { countriesList, getAddressFromGGmaps } from 'utils';
import * as yup from 'yup';
import DetailAddressView from './DetailAddressView';

const schema = yup
  .object({
    address: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        company: yup.string().required(),
        number: yup.number().integer().required(),
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
        zip: yup.string().required(),
        type: yup.string().required()
      })
    )
  })
  .required();

export default function CreateAddressDialog({ open, setOpen, mode, data, setMode, handleRemoveAddress }) {
  const [openAlert, setOpenAlert] = useState(false);
  const { mutate: createAddress } = useCreateAddress();
  const { mutate: updateAddress } = useUpdateAddress();

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    setOpen(false);
  };

  function closeAddressModal(event, reason) {
    if (reason === 'backdropClick') {
      return;
    }
    setOpen(false);
  }

  const { control, handleSubmit, setValue, clearErrors } = useForm({
    defaultValues: {
      address: [
        {
          name: '',
          company: '',
          number: '',
          email: '',
          address_second: '',
          city: '',
          state: '',
          zip: '',
          type: ''
        }
      ]
    },
    resolver: yupResolver(schema)
  });

  const { fields: addressFields } = useFieldArray({
    control,
    name: 'address'
  });

  const countryValue = countriesList.find((item) => item.code === data?.country);

  useEffect(() => {
    if (data && mode.edit && open) {
      clearErrors();
      setValue('address', [
        {
          name: data?.name,
          company: data?.company,
          number: data?.number,
          email: data?.email,
          country: countryValue,
          address_first: data?.address_first,
          address_second: data?.address_second,
          city: data?.city,
          state: data?.state,
          zip: data?.zip,
          type: data?.type
        }
      ]);
    } else {
      if (mode.add) {
        setValue('address', [{}]);
      }
    }
  }, [countryValue, setValue, data, mode.edit, mode.add, open, clearErrors]);

  const optionType = [
    { value: 'sender', label: 'sender' },
    { value: 'receiver', label: 'receiver' }
  ];

  const onEdit = () => {
    setMode({ edit: true, view: false });
  };

  const onCancel = () => {
    closeAddressModal();
  };

  const onSubmit = (formValue) => {
    const bodyRaw = {
      ...formValue.address[0],
      address_first: mode.edit ? formValue.address[0]?.address_first : getAddressFromGGmaps(formValue.address[0]?.address_first),
      country: formValue.address[0]?.country?.code,
      uuid: data?.uuid
    };

    if (mode.edit) {
      updateAddress(bodyRaw);
    } else {
      createAddress(bodyRaw);
    }
    closeAddressModal();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeAddressModal}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        disableEscapeKeyDown
      >
        <DialogTitle>
          <Typography variant="h5">Sender Address</Typography>
        </DialogTitle>
        <Divider />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ p: 2.5 }}>
            {mode.view && <DetailAddressView data={data} />}
            {!mode.view && (
              <>
                {addressFields.map((item, index) => (
                  <Grid container rowSpacing={2} columnSpacing={2} key={item.id}>
                    <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                      <InputField name={`address.${index}.name`} control={control} label="Full name" readOnly={mode.view ? true : false} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                      <InputField name={`address.${index}.company`} control={control} label="Company Name" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputField name={`address.${index}.number`} control={control} label="Phone number" placeholder="###-###-####" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`address.${index}.email`} control={control} label="Email" placeholder="you@example.com" />
                    </Grid>
                    <Grid item xs={12} mt={1}>
                      <CountryField control={control} name={`address.${index}.country`} />
                    </Grid>
                    <Grid item xs={12}>
                      <GoogleMaps
                        control={control}
                        name={`address.${index}.address_first`}
                        setValue={setValue}
                        index={index}
                        address={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`address.${index}.address_second`} control={control} label="Address line 2(optional)" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`address.${index}.city`} control={control} label="city" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputField name={`address.${index}.state`} control={control} label="state" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`address.${index}.zip`} control={control} label="Postal code/ZipCode" />
                    </Grid>
                    <Grid item xs={12}>
                      <RadioField name={`address.${index}.type`} control={control} label="type" options={optionType} />
                    </Grid>
                  </Grid>
                ))}
              </>
            )}
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {mode.edit && (
                  <Tooltip title="Delete Customer" placement="top">
                    <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                      <DeleteFilled />
                    </IconButton>
                  </Tooltip>
                )}

                {mode.view && (
                  <Tooltip title="Edit Address" placement="top">
                    <IconButton onClick={onEdit} size="large" color="error">
                      <EditFilled />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>

              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={onCancel}>
                    Cancel
                  </Button>

                  {!mode.view && (
                    <Button color="primary" variant="contained" type="submit">
                      Add
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
      {mode.edit && <AlertColumnDelete open={openAlert} handleClose={handleAlertClose} onConfirmDelete={handleRemoveAddress} />}
    </>
  );
}

CreateAddressDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setMode: PropTypes.func,
  mode: PropTypes.object,
  data: PropTypes.object,
  handleRemoveAddress: PropTypes.func
};

CreateAddressDialog.defaultProps = {
  open: false,
  setOpen: () => {},
  setMode: () => {},
  mode: {},
  data: {},
  handleRemoveAddress: () => null
};
