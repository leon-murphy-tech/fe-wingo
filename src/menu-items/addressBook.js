import { FormattedMessage } from 'react-intl';

// assets
import { MessageOutlined } from '@ant-design/icons';

// icons
const icons = {
  MessageOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const addressBook = {
  id: 'Address Book',
  title: <FormattedMessage id="Address Book" />,
  type: 'group',
  children: [
    {
      id: 'My Address',
      title: <FormattedMessage id="My Address" />,
      type: 'item',
      url: '/addressBook',
      icon: icons.MessageOutlined
    }
  ]
};

export default addressBook;
