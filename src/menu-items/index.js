// project import
import dashboard from './dashboard';

import addressBook from './addressBook';
import contact from './contact';
import manage from './manage';
import ShipmentMenu from './shipment';
import { useSelector } from 'react-redux';

// ==============================|| MENU ITEMS ||============================== //

function MenuItems() {
  const { user } = useSelector((state) => state.authUser);
  const role = user?.role;

  const hasManage = role === 'RL1' || role === 'RL2';

  const shipment = ShipmentMenu();
  const menuItems = {
    items: [dashboard, shipment, addressBook, contact, manage]
  };

  if (hasManage) {
    return menuItems;
  } else {
    const menuItems = {
      items: [dashboard, shipment, addressBook, contact]
    };
    return menuItems;
  }
}

export default MenuItems;
