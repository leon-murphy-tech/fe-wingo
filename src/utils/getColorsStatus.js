export const getColorStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'warning ';
    case 'info_received':
      return 'warning';
    case 'in_transit':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'out_for_delivery':
      return 'success';
    case 'failed_attempt':
      return 'error';
    case 'available_for_pickup':
      return 'success';
    case 'exception':
      return 'error';
    default:
      return 'info';
  }
};

export const getColorStatusManifest = (status) => {
  switch (status) {
    case '1':
      return 'secondary';
    case '2 ':
      return 'primary';
    case '3':
      return 'warning';
    case '4':
      return 'info';
    case '5':
      return 'error';
    case '6':
      return 'success';
    default:
      return 'primary';
  }
};

export const getColorTypeAddress = (status) => {
  switch (status) {
    case 'sender':
      return 'info';

    case 'receiver':
      return 'success';

    default:
      return 'secondary';
  }
};

export const getColorStatusUser = (status) => {
  switch (status) {
    case 1:
      return 'success';
    case 2:
      return 'error';
    default:
      return 'secondary';
  }
};
