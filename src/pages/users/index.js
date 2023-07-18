import { HomeOutlined } from '@ant-design/icons';
import { Box, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import ProfileBanner from 'assets/images/profile-banner.png';

export default function ProfileUser() {
  return (
    <>
      <MainCard boxShadow={true}>
        <Box>
          <Box>
            <img src={ProfileBanner} alt="profile-banner" />
          </Box>
        </Box>
        <Stack>
          <Box>
            <img src="" alt="" />
          </Box>
          <Stack>
            <Typography></Typography>
            <Stack>
              <Stack>
                <HomeOutlined />
                <Typography></Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
}
