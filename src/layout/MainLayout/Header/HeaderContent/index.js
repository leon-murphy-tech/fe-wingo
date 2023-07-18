// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Message from './Message';
import MobileSection from './MobileSection';
import Notification from './Notification';
import Profile from './Profile';
import Search from './Search';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {!matchesXs && <Search />}
      {/* no need right now */}
      {/* {!matchesXs && megaMenu} */}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      <Message />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
