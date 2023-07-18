import { Suspense } from 'react';

// material-ui
import { useTheme } from '@emotion/react';
import { Grid } from '@mui/material';

// project import
import { ReportCard } from 'components/cards/statistics';

// assets
import { BarChartOutlined, CalendarOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import FeedsCard from 'sections/dashboard/Notification';
import LatestOrder from 'sections/dashboard/LatestOrder';
import Loader from 'components/Loader';

// ==============================|| SAMPLE PAGE ||============================== //

const DashboardPage = () => {
  const theme = useTheme();

  return (
    <Suspense fallback={<Loader />}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} lg={3} sm={6}>
          <ReportCard primary="7,050" secondary="In transit" color={theme.palette.secondary.main} iconPrimary={BarChartOutlined} />
        </Grid>
        <Grid item xs={12} lg={3} sm={6}>
          <ReportCard primary="145" secondary="Pending" color={theme.palette.error.main} iconPrimary={CalendarOutlined} />
        </Grid>
        <Grid item xs={12} lg={3} sm={6}>
          <ReportCard primary="290" secondary="Cancel" color={theme.palette.success.dark} iconPrimary={FileTextOutlined} />
        </Grid>
        <Grid item xs={12} lg={3} sm={6}>
          <ReportCard primary="500" secondary="Return" color={theme.palette.primary.main} iconPrimary={DownloadOutlined} />
        </Grid>

        {/* row 2 */}
        <Grid item xs={12} md={5} lg={4}>
          <FeedsCard />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <LatestOrder />
        </Grid>
      </Grid>
    </Suspense>
  );
};

export default DashboardPage;
