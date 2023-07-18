// material-ui
// import { useTheme } from '@mui/material/styles';
import logoIcon from 'assets/images/logo-wingo.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 *
 */

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  // const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === 'dark' ? logoIconDark : logoIcon} alt="Mantis" width="100" />
     *
     */
    <img src={logoIcon} alt="wingo" width="50" />
  );
};

export default LogoIcon;
