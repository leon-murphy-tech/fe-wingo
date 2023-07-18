/* eslint-disable react/prop-types */
import { ShoppingFilled } from '@ant-design/icons';
import DoneIcon from '@mui/icons-material/Done';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TelegramIcon from '@mui/icons-material/Telegram';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.40397408963585435) 0%, rgba(0,212,255,0.9810049019607843) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      //   backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      backgroundImage:
        'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.40397408963585435) 0%, rgba(0,212,255,0.9810049019607843) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    background: theme.palette.primary.dark,

    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    background: theme.palette.primary.dark
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ShoppingFilled />,
    2: <TelegramIcon />,
    3: <LocalShippingIcon />,
    4: <DoneIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['pending', 'pickup', 'transit', 'delivered'];

export function ProgressTracking({ data }) {
  const activeStepNumber = () => {
    if (!isEmpty(data)) {
      const itemStatus = data?.tracking_history[data?.tracking_history?.length - 1]?.status || 0;
      return steps.indexOf(itemStatus);
    } else {
      return 0;
    }
  };

  console.log('idnex', activeStepNumber());
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStepNumber()} connector={<ColorlibConnector />}>
        {steps?.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

ProgressTracking.propTypes = {
  data: PropTypes.object
};

ProgressTracking.defaultProps = {
  data: {}
};
