import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Stack, Tab, Tabs, Typography } from '@mui/material';

// project imports
import Avatar from 'components/@extended/Avatar';
import BillingAddress from 'sections/apps/e-commerce/checkout/BillingAddress';
import Cart from 'sections/apps/e-commerce/checkout/Cart';
import CartEmpty from 'sections/apps/e-commerce/checkout/CartEmpty';
import Payment from 'sections/apps/e-commerce/checkout/Payment';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch, useSelector } from 'store';
import { getAddresses, editAddress } from 'store/reducers/product';
import { removeProduct, setBackStep, setBillingAddress, setNextStep, setShippingCharge, setStep, updateProduct } from 'store/reducers/cart';

// assets
import { CheckOutlined } from '@ant-design/icons';

export const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  minHeight: 'auto',
  minWidth: 250,
  padding: 16,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  textAlign: 'left',
  justifyContent: 'flex-start',
  '&:after': {
    backgroundColor: 'transparent !important'
  },

  '& > svg': {
    marginBottom: '0px !important',
    marginRight: 10,
    marginTop: 2,
    height: 20,
    width: 20
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 'auto'
  }
}));

// tabs option
const tabsOption = [
  {
    label: 'Cart'
  },
  {
    label: 'Shipping Information'
  },
  {
    label: 'Payment'
  }
];

// tabs
export function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
