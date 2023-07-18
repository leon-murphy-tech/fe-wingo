import { Grid, List, ListItem, Stack, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { getLabelRole } from 'utils';

export default function DetailViewUser({ data }) {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <List sx={{ py: 0 }}>
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Full Name</Typography>
                <Typography>{data.name}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Company Name</Typography>
                <Typography>{data.company}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Phone</Typography>
                <Typography>
                  {/* (+1-876) <NumberFormat value={8654239581} displayType="text" type="text" format="#### ### ###" /> */}
                  {data.phone}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Email</Typography>
                <Typography>{data.email}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider={!matchDownMD}>
          <Stack spacing={0.5}>
            <Typography color="secondary">Address</Typography>
            <Typography>{data.address1}</Typography>
          </Stack>
        </ListItem>

        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Country</Typography>
                <Typography>{data.country}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Zip Code</Typography>
                <Typography>{data.zip}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">State</Typography>
                <Typography>{data.sate}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Role</Typography>
                <Typography>{getLabelRole(data?.role)}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </>
  );
}

DetailViewUser.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,

  data: PropTypes.object
};

DetailViewUser.defaultProps = {
  open: false,
  setOpen: () => {},
  data: {}
};
