import { CameraOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import AlertColumnDelete from 'components/Alert/AlertColumnDelete';
import { CountryField, InputField, SelectField } from 'components/formField';
import GoogleMaps from 'components/formField/GoogleMap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { countriesList, getAddressFromGGmaps } from 'utils';
import { useTheme } from '@emotion/react';
import Avatar from 'components/@extended/Avatar';
import { useAddUser } from 'hooks/user/useAddUser';
import DetailViewUser from './DetailViewUser';
import { useUpdateUser } from 'hooks/user/useUpdateUser';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    userForm: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        company: yup.string().required(),
        password: yup.string().required(),
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
        role: yup.string().required()
      })
    )
  })
  .required();

export default function AddUserDialog({ open, setOpen, mode, data, setMode, onRemove }) {
  const theme = useTheme();
  const [openAlert, setOpenAlert] = useState(false);

  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState();

  const { mutate: addUser } = useAddUser();
  const { mutate: updateUser } = useUpdateUser();

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

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

  const { control, handleSubmit, setValue, reset, clearErrors } = useForm({
    defaultValues: {
      userForm: [
        {
          password: ''
        }
      ]
    },
    resolver: yupResolver(schema)
  });

  const { fields: senderInfoFields } = useFieldArray({
    control,
    name: 'userForm'
  });

  const countryValue = countriesList.find((item) => item.code === data?.country);
  useEffect(() => {
    if (data && mode.edit && open) {
      clearErrors();

      if (data?.image) {
        // eslint-disable-next-line no-undef
        const urlAvtar = `${process.env.REACT_APP_API_URL}${data?.image}`;

        setAvatar(urlAvtar);
      } else {
        setAvatar(null);
      }

      setValue('userForm', [
        {
          name: data?.name,
          company: data?.company,
          number: data?.number,
          email: data?.email,
          country: countryValue,
          address_first: data?.address,
          address_second: data?.address_second,
          city: data?.city,
          state: data?.state,
          zip: data?.zip,
          role: data?.role
        }
      ]);
    } else {
      if (mode.add) {
        setValue('userForm', [{}]);
      }
    }
  }, [countryValue, setValue, data, mode.edit, mode.add, open, clearErrors]);

  const optionRole = [
    { value: '', label: 'select role' },
    { value: 'RL1', label: 'admin' },
    { value: 'RL2', label: 'manager' },
    { value: 'RL3', label: 'customer' },
    { value: 'RL4', label: 'sale staff' }
  ];

  const onEdit = () => {
    setMode({ edit: true, view: false });
  };

  const onSubmit = (formValue) => {
    const payload = new FormData();
    payload.append('name', formValue?.userForm[0]?.name);
    payload.append('company', formValue?.userForm[0]?.company);
    payload.append('email', formValue?.userForm[0]?.email);
    payload.append('password', formValue?.userForm[0]?.password);
    payload.append('country', formValue?.userForm[0]?.country?.code);
    payload.append(
      'address',
      mode.edit ? formValue.userForm[0]?.address_first : getAddressFromGGmaps(formValue.userForm[0]?.address_first)
    );
    payload.append('city', formValue?.userForm[0]?.city);
    payload.append('zip', formValue?.userForm[0]?.zip);
    payload.append('state', formValue?.userForm[0]?.state);
    payload.append('role', formValue?.userForm[0]?.role);
    payload.append('image', selectedImage);

    if (mode.add) {
      addUser(payload);
      reset();
    } else {
      const id = data?.uuid;

      updateUser({ payload, id });
    }
    setOpen(false);
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
      >
        <DialogTitle>
          <Typography variant="h5">Add User</Typography>
        </DialogTitle>
        <Divider />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ p: 2.5 }}>
            {mode.view && <DetailViewUser data={data} />}
            {!mode.view && (
              <>
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
                      <FormLabel
                        htmlFor="change-avtar"
                        sx={{
                          position: 'relative',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          '&:hover .MuiBox-root': { opacity: 1 },
                          cursor: 'pointer'
                        }}
                      >
                        <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Stack spacing={0.5} alignItems="center">
                            <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                            <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                          </Stack>
                        </Box>
                      </FormLabel>
                      <TextField
                        type="file"
                        id="change-avtar"
                        placeholder="Outlined"
                        variant="outlined"
                        sx={{ display: 'none' }}
                        onChange={(e) => setSelectedImage(e.target.files?.[0])}
                      />
                    </Stack>
                  </Grid>

                  {senderInfoFields?.map((item, index) => (
                    <Grid item key={item.id}>
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                          <InputField name={`userForm.${index}.name`} control={control} label="Full name" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                          <InputField name={`userForm.${index}.company`} control={control} label="Company Name" />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputField name={`userForm.${index}.email`} control={control} label="Email" placeholder="you@example.com" />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputField name={`userForm.${index}.password`} control={control} label="Password" />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputField name={`userForm.${index}.number`} control={control} label="Phone number" placeholder="###-###-####" />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <SelectField name={`userForm.${index}.role`} control={control} label="Role" options={optionRole} />
                        </Grid>

                        <Grid item xs={12} mt={1}>
                          <CountryField control={control} name={`userForm.${index}.country`} />
                        </Grid>
                        <Grid item xs={12}>
                          <GoogleMaps
                            control={control}
                            name={`userForm.${index}.address_first`}
                            setValue={setValue}
                            index={index}
                            user={true}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputField name={`userForm.${index}.address_second`} control={control} label="Address line 2(optional)" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputField name={`userForm.${index}.city`} control={control} label="city" readOnly={mode.view ? true : false} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputField name={`userForm.${index}.state`} control={control} label="state" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputField name={`userForm.${index}.zip`} control={control} label="Postal code/zipcode" />
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
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
                  <Button color="error" onClick={closeAddressModal}>
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
      {mode.edit && <AlertColumnDelete open={openAlert} handleClose={handleAlertClose} onConfirmDelete={onRemove} />}
    </>
  );
}

AddUserDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setMode: PropTypes.func,
  mode: PropTypes.object,
  data: PropTypes.object,
  onRemove: PropTypes.func
};

AddUserDialog.defaultProps = {
  open: false,
  setOpen: () => {},
  setMode: () => {},
  mode: {},
  data: {},
  onRemove: () => null
};
