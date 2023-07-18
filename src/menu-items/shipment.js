import { FormattedMessage } from 'react-intl';
import { CalendarOutlined, DatabaseOutlined, FileTextOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
// icons
const icons = {
  DatabaseOutlined,
  CalendarOutlined,
  FileTextOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

export default function ShipmentMenu() {
  const { user } = useSelector((state) => state.authUser);
  const role = user?.role;

  const menuRl1 = {
    id: 'Shipment',
    title: <FormattedMessage id="Shipment" />,
    type: 'group',
    children: [
      {
        id: 'All Shipment',
        title: <FormattedMessage id="All Shipment" />,
        type: 'item',
        url: '/shipment/allShipment',
        icon: icons.DatabaseOutlined
      },
      {
        id: 'Manifest Shipment',
        title: <FormattedMessage id="Manifest Shipment" />,
        type: 'item',
        url: '/shipment/manifestShipment/all',
        icon: icons.CalendarOutlined
      },

      {
        id: 'TrackingShipment',
        title: <FormattedMessage id="Tracking Shipment" />,
        type: 'item',
        url: '/shipment/trackingShipment',
        icon: icons.CalendarOutlined
      }
    ]
  };

  const menuRl3 = {
    id: 'Shipment',
    title: <FormattedMessage id="Shipment" />,
    type: 'group',
    children: [
      {
        id: 'All Shipment',
        title: <FormattedMessage id="All Shipment" />,
        type: 'item',
        url: '/shipment/allShipment',
        icon: icons.DatabaseOutlined
      },
      {
        id: 'TrackingShipment',
        title: <FormattedMessage id="Tracking Shipment" />,
        type: 'item',
        url: '/shipment/trackingShipment',
        icon: icons.CalendarOutlined
      }
    ]
  };

  if (role === 'RL1' || role === 'RL2') {
    return menuRl1;
  } else {
    return menuRl3;
  }
}
