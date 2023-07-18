// import PropTypes from 'prop-types';
import logoIcon from 'assets/images/logo-wingo.png';
// material-ui
// import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const LogoMain = () => {
  // const theme = useTheme();
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Mantis" width="100" />
     *
     */
    <>
      <img src={logoIcon} alt="wingo" width="190" />
    </>
  );
};

export default LogoMain;
