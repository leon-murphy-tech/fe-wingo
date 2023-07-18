import PropTypes from 'prop-types';

// material-ui
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import { PlusCircleOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
import Logo from 'components/logo';
import { LAYOUT_CONST } from 'config';
import useConfig from 'hooks/useConfig';
import { Link } from 'react-router-dom';
import DrawerHeaderStyled from './DrawerHeaderStyled';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { openItem, drawerOpen } = useSelector((state) => state.menu);

  const { menuOrientation } = useConfig();
  const isHorizontal = menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG;
  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === 'dark' && drawerOpen ? 'text.primary' : 'primary.main';

  const isSelected = useMemo(() => {
    if (openItem[0] === 'createNew') {
      return true;
    } else return false;
  }, [openItem]);

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: isHorizontal ? 'unset' : '60px',
        width: isHorizontal ? { xs: '100%', lg: '424px' } : 'inherit',
        paddingTop: isHorizontal ? { xs: '10px', lg: '0' } : '8px',
        paddingBottom: isHorizontal ? { xs: '18px', lg: '0' } : '20px',
        paddingLeft: isHorizontal ? { xs: '24px', lg: '0' } : open ? '0px' : 0
      }}
    >
      <Logo isIcon={!open} sx={{ width: open ? 'auto' : 35, height: 35, marginTop: '10px' }} />
      {!open ? (
        <IconButton
          component={Link}
          to="/shipment/createNewShipment"
          sx={{ width: '30px', height: '30px', color: isSelected ? iconSelectedColor : textColor }}
        >
          <PlusCircleOutlined />
        </IconButton>
      ) : (
        <Button size="" variant="contained" sx={{ margin: '30px 0px 10px' }} component={Link} to="/shipment/createNewShipment">
          {'Create New shipment'}
        </Button>
      )}
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
