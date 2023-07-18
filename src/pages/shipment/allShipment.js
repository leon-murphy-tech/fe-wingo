/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { Chip, Stack, Tooltip } from '@mui/material';
import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { IndeterminateCheckbox } from 'components/third-party/ReactTable';
import { TabaleShipment } from 'components/table';
import dayjs from 'dayjs';
import { useGetShipment } from 'hooks';
import { getColorStatus, getCountryDisplayName } from 'utils';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';
import { useServices } from 'hooks/services/useGetServices';
import AlertColumnDelete from 'components/Alert/AlertColumnDelete';
import { useRemoveShipment } from 'hooks/shipment/useDeleteShipment';
import { truncate } from 'lodash';

// ==============================|| INVOICE - LIST ||============================== //

// Status
const StatusCell = ({ row }) => {
  const { values } = row;
  return <Chip color={getColorStatus(values.status)} label={values.status} size="small" sx={{ minWidth: '80px' }} variant="light" />;
};

StatusCell.propTypes = {
  row: PropTypes.object
};

const CustomerCellDate = ({ row }) => {
  const { values } = row;
  return dayjs(values.created_at).format('DD-MM-YYYY');
};
CustomerCellDate.propTypes = {
  row: PropTypes.object
};

/* const CustomerCellWeight = () => {
  return 'not found';
}; */

CustomerCellDate.propTypes = {
  row: PropTypes.object
};

// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

export default function AllShipment() {
  const navigation = useNavigate();
  const theme = useTheme();

  const { data: listShipmentSort, isLoading } = useGetShipment();
  const { mutate: removeShipment } = useRemoveShipment();
  const { getServiceName } = useServices();
  const [alertPopup, SetAlertPopup] = useState(false);
  const [hawbChose, setHawbchose] = useState();

  const handleAlertClose = () => {
    SetAlertPopup(!alertPopup);
    // setMode({...mode, });
  };

  const onDelete = () => {
    removeShipment(hawbChose);
  };

  // cell country
  const CustomerCellCountry = ({ row }) => {
    return getCountryDisplayName(row?.values?.['receiver_address.country']);
  };

  // cell service
  const cellService = useCallback(
    ({ row }) => {
      return getServiceName(row?.values?.['service_id']);
    },
    [getServiceName]
  );

  const cellReceiver = useCallback(({ row }) => {
    return truncate(row?.values?.['receiver_address.name'], {
      length: 20,
      separator: /,? +/
    });
  }, []);

  //Action Cell
  const ActionCell = useCallback(
    ({ row }) => {
      return (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
          <Tooltip title="View">
            <IconButton
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                // eslint-disable-next-line react/prop-types
                navigation(`/shipment/viewShipmentDetail/${row?.values?.hawb}`);
              }}
            >
              <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                // eslint-disable-next-line react/prop-types
                navigation(`/shipment/editShipment/${row?.values?.hawb}`);
              }}
            >
              <EditTwoTone twoToneColor={theme.palette.primary.main} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                SetAlertPopup(true);
                setHawbchose(row?.values?.hawb);
              }}
            >
              <DeleteTwoTone twoToneColor={theme.palette.error.main} />
            </IconButton>
          </Tooltip>
        </Stack>
      );
    },
    [navigation, theme]
  );

  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: SelectionHeader,
        accessor: 'selection',
        Cell: SelectionCell,
        disableSortBy: true,
        disableFilters: true
      },
      {
        Header: 'shipment id',
        accessor: 'hawb',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: 'status',
        accessor: 'status',
        disableFilters: true,
        Cell: StatusCell
      },
      {
        Header: 'date',
        accessor: 'created_at',
        Cell: CustomerCellDate
      },
      {
        Header: 'Receiver',
        accessor: 'receiver_address.name',
        Cell: cellReceiver
      },
      {
        Header: 'destination',
        className: 'cell-center',
        accessor: 'receiver_address.country',
        disableSortBy: true,
        Cell: CustomerCellCountry
      },
      {
        Header: 'service',
        accessor: 'service_id',
        Cell: cellService
      },
      /* {
        Header: 'weight',
        accessor: 'shipmentPackage.packageWeight',
        Cell: CustomerCellWeight
      }, */

      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ActionCell
      }
    ],
    [cellService, ActionCell, cellReceiver]
  );

  //   const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <MainCard content={false} boxShadow={true}>
        <ScrollX>
          <TabaleShipment columns={columns} data={listShipmentSort} loading={isLoading} />
        </ScrollX>
      </MainCard>
      <AlertColumnDelete title={`Are you sure deleted it`} open={alertPopup} handleClose={handleAlertClose} onConfirmDelete={onDelete} />
    </>
  );
}
