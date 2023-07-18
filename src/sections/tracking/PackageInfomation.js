// material-ui
import { CardContent, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

// assets

// ==============================|| DATA WIDGET - FEEDS ||============================== //

export const PackageInfomation = ({ data }) => {
  return (
    <MainCard
      title="Package Infomation"
      content={false}
      sx={{
        height: '100%'
      }}
    >
      <CardContent
        sx={{
          '& .MuiPaper-root': {
            height: '100%'
          }
        }}
      >
        <Grid container spacing={3}>
          {/*  <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="body2">
                  Tracking Number
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption" color="secondary">
                  {data.id}
                </Typography>
              </Grid>
            </Grid>
          </Grid> */}

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="body2">
                  Recipient Name
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption" color="secondary">
                  {data.receiver_name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="body2">
                  Phone number
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption" color="secondary">
                  {data.receiver_phone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="body2">
                  Shipped From
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption" color="secondary">
                  {data.sender_country}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="body2">
                  Delivery To
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption" color="secondary">
                  {data.receiver_country}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="body2">
                  Service
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption" color="secondary">
                  {data.service}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="body2">
                  Weight
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption" color="secondary">
                  {data.weight}
                  {' KG'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="body2">
                  Support
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption" color="secondary">
                  028 9999 3137
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

PackageInfomation.propTypes = {
  data: PropTypes.object
};

PackageInfomation.defaultProps = {
  data: {}
};
