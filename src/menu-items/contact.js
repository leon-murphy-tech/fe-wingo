import { FormattedMessage } from 'react-intl';

// assets
import { PhoneOutlined } from '@ant-design/icons';

// icons
const icons = {
  PhoneOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const contact = {
  id: 'Contact',
  title: <FormattedMessage id="Contact" />,
  type: 'group',
  children: [
    {
      id: 'Contact US',
      title: <FormattedMessage id="Contact US" />,
      type: 'item',
      url: '/contact',
      icon: icons.PhoneOutlined
    }
  ]
};

export default contact;
