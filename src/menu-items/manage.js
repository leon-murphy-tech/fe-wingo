// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { UnorderedListOutlined } from '@ant-design/icons';

// icons
const icons = {
  UnorderedListOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const manage = {
  id: 'Manage',
  title: <FormattedMessage id="Manage" />,
  type: 'group',
  children: [
    {
      id: 'All User',
      title: <FormattedMessage id="All User" />,
      type: 'item',
      url: '/manage/allUser',
      icon: icons.UnorderedListOutlined
    }
  ]
};

export default manage;
