export const getLabelManifest = (status) => {
  switch (status) {
    case '1':
      return 'Booked';
    case '2':
      return 'Departed';
    case '3':
      return 'Arrived';
    case '4':
      return 'Received';
    case '5':
      return 'Notified';
    case '6':
      return 'Delivered';
    default:
      return 'not found';
  }
};

export const getLabelTypeAddress = (status) => {
  switch (status) {
    case '1':
      return 'Sender';
    case '2':
      return 'Receiver';

    default:
      return 'not found';
  }
};

export const getLabelStatusUser = (status) => {
  switch (status) {
    case 1:
      return 'Active';
    case 2:
      return 'Inactive';

    default:
      return '-';
  }
};

export const getLabelRole = (role) => {
  switch (role) {
    case 'RL1':
      return 'admin';
    case 'RL2':
      return 'manager';
    case 'RL3':
      return 'customer';
    case 'RL4':
      return 'sale staff';
    default:
      return 'none';
  }
};
