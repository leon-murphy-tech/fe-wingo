import { Link as RouterLink } from 'react-router-dom';
import { Box, CardContent, Grid, Link, Typography } from '@mui/material';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import { CheckOutlined } from '@ant-design/icons';
import { useGetNotification } from 'hooks/user/useGetNotification';
import dayjs from 'dayjs';

// ==============================|| DATA WIDGET - FEEDS ||============================== //

const FeedsCard = () => {
  const { data: notiList } = useGetNotification();
  return (
    <MainCard
      title="Notification"
      content={false}
      secondary={
        <Link component={RouterLink} to="#" color="primary">
          View all Notification
        </Link>
      }
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
          {notiList?.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar color="success" type="filled" size="sm">
                      <CheckOutlined />
                    </Avatar>
                  </Box>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Grid container spacing={1}>
                    <Grid item xs zeroMinWidth>
                      <Typography align="left" variant="body2">
                        {item.post_title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="left" variant="caption" color="secondary">
                        {dayjs(item.createdAt).format('DD-MM-YYYY')}
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
};

export default FeedsCard;
