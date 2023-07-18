// material-ui
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import DoneIcon from '@mui/icons-material/Done';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TelegramIcon from '@mui/icons-material/Telegram';
import { CardContent, Grid, Typography } from '@mui/material';

// project imports
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

// assets
// import { MobileFilled } from '@ant-design/icons';
import { ShoppingFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// ==========================|| DATA WIDGET - LATEST MESSAGES ||========================== //

//maping icon
const getTrackingIcon = (status) => {
  switch (status) {
    case 'pending':
      return <ShoppingFilled />;
    case 'in-transit':
      return <LocalShippingIcon />;
    case 'cancel':
      return <AssignmentReturnIcon />;
    case 'delivered':
      return <DoneIcon />;
    case 'return':
      return <AssignmentReturnIcon />;
    case 'pickup':
      return <TelegramIcon />;
    default:
      return <InventoryIcon />;
  }
};

export const TrackingHistory = ({ data }) => (
  <MainCard title="Tracking History" content={false}>
    <CardContent sx={{ paddingRight: '0px', paddingBottom: '0px !important', height: 390 }}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        sx={{
          '& > :first-child:after': {
            position: 'relative'
          },
          maxHeight: 390,
          overflowY: 'auto',
          paddingBottom: '20px',
          marginTop: '-20px'
        }}
      >
        {data?.tracking_history?.map((item, index) => (
          <Grid
            item
            xs={12}
            key={index}
            sx={{
              position: 'relative',
              '&>*': {
                position: 'relative',
                zIndex: '5'
              },
              '&:after': {
                content: '""',
                position: 'absolute',
                top: -3,
                left: 163,
                width: 2,
                height: '100%',
                background: '#ebebeb',
                zIndex: '1'
              }
            }}
          >
            <Grid container spacing={2} pt={3}>
              <Grid item>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs zeroMinWidth sx={{ minWidth: 120 }}>
                    <Typography align="left" variant="subtitle1" component="div">
                      {dayjs(item.date).format('YYYY-MM-DD')}
                    </Typography>
                    <Typography color="secondary" align="left" variant="caption">
                      {dayjs(item.date).format('hh:mm:ss')}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar color="primary">{getTrackingIcon(item.status)}</Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs zeroMinWidth ml={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography component="div" align="left" variant="subtitle1">
                      {item.detail}
                    </Typography>
                    <Typography color="secondary" align="left" variant="caption">
                      {item.location}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </MainCard>
);

TrackingHistory.propTypes = {
  data: PropTypes.object
};

TrackingHistory.defaultProps = {
  data: {}
};
