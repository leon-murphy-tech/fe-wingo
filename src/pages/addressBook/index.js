import { DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Chip, Stack, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from 'components/@extended/IconButton';
import AlertColumnDelete from 'components/Alert/AlertColumnDelete';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { SearchField } from 'components/formField';
import { TabaleManifest } from 'components/table';
import { CSVExport, IndeterminateCheckbox } from 'components/third-party/ReactTable';
import dayjs from 'dayjs';
import { useGetAddressBook } from 'hooks/addressBook/useGetAddressBook';
import { useGetAddressDetail } from 'hooks/addressBook/useGetAddressDetail';
import { useRemoveAddress } from 'hooks/addressBook/useRemoveAddress';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import CreateAddressDialog from 'sections/address/CreateAddressDialog';
import { getColorTypeAddress, getCountryDisplayName } from 'utils';

// ==============================|| INVOICE - LIST ||============================== //

// Status
const StatusCell = ({ row }) => {
  const { values } = row;
  //   return <Chip color={getColorStatus(values.status)} label={values.status} size="small" sx={{ minWidth: '80px' }} />;
  return <Chip color={getColorTypeAddress(values.type)} label={values.type} size="small" sx={{ minWidth: '80px' }} variant="light" />;
};

StatusCell.propTypes = {
  row: PropTypes.object
};

//cel Date
const CustomerCellDate = ({ row }) => {
  const { values } = row;
  return dayjs(values.createdAt).format('DD-MM-YYYY');
};
CustomerCellDate.propTypes = {
  row: PropTypes.object
};

// Action Cell
const ActionCell = ({ theme, setOpenAlert, setRowValues, handleEdit, row, handleView }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title="View">
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            setRowValues(row);
            handleView();
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
            setRowValues(row);
            handleEdit();
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
            setRowValues(row);
            setOpenAlert(true);
          }}
        >
          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

ActionCell.propTypes = {
  row: PropTypes.array,
  theme: PropTypes.object,
  setOpenAlert: PropTypes.func,
  setOpenCreateModal: PropTypes.func.isRequired,
  setRowValues: PropTypes.func,
  handleEdit: PropTypes.func.isRequired,
  handleView: PropTypes.func
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

export default function AddressBookPage() {
  const theme = useTheme();
  const [rowValues, setRowValues] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [mode, setMode] = useState({
    edit: false,
    view: false,
    add: true
  });

  const { data } = useGetAddressDetail(rowValues?.uuid);

  const { mutate: removeAddress } = useRemoveAddress();

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    // setMode({...mode, });
  };

  const handleEdit = useCallback(() => {
    setOpenCreateModal(true);
    setMode({ edit: true, view: false, add: true });
  }, [setMode, setOpenCreateModal]);

  const handleView = useCallback(() => {
    setOpenCreateModal(true);
    setMode({ edit: false, view: true, add: false });
  }, [setMode, setOpenCreateModal]);

  const handleCreateModal = () => {
    setOpenCreateModal(true);
    setMode({ edit: false, view: false, add: true });
  };

  const handleRemoveAddress = () => {
    removeAddress(rowValues?.uuid);
  };

  const { data: listAddressBook } = useGetAddressBook();

  // cell country
  const CustomerCellCountry = ({ row }) => {
    return getCountryDisplayName(row?.values?.country);
  };

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
        Header: 'uuid',
        accessor: 'uuid'
      },
      {
        Header: 'full Name',
        accessor: 'name',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: 'adddress',
        accessor: 'address_first'
      },
      {
        Header: 'phone',
        accessor: 'number'
      },
      {
        Header: 'country',
        accessor: 'country',
        className: 'cell-center',
        Cell: CustomerCellCountry
      },
      {
        Header: 'type',
        accessor: 'type',
        Cell: StatusCell,
        className: 'cell-center'
      },

      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        // eslint-disable-next-line react/prop-types
        Cell: ({ row: { values } }) => (
          <ActionCell
            row={values}
            theme={theme}
            setOpenAlert={setOpenAlert}
            setOpenCreateModal={setOpenCreateModal}
            handleEdit={handleEdit}
            handleView={handleView}
            setRowValues={setRowValues}
          />
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <MainCard content={false} boxShadow={true}>
        <ScrollX>
          <Stack spacing={3}>
            <Stack
              direction={matchDownSM ? 'column' : 'row'}
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: 3, pb: 0 }}
            >
              <SearchField size="small" />
              <Stack direction={'row'} alignItems="center" spacing={2}>
                <Button variant="contained" startIcon={<PlusOutlined />} size="small" sx={{ width: '120px' }} onClick={handleCreateModal}>
                  Add Address
                </Button>

                <CSVExport />
              </Stack>
            </Stack>

            <TabaleManifest columns={columns} data={listAddressBook} hiddenColumn={['uuid']} />
            <AlertColumnDelete
              title={`Are you sure deleted this item`}
              open={openAlert}
              handleClose={handleAlertClose}
              onConfirmDelete={handleRemoveAddress}
            />
          </Stack>
        </ScrollX>
      </MainCard>
      <CreateAddressDialog
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        mode={mode}
        data={data}
        setMode={setMode}
        handleRemoveAddress={handleRemoveAddress}
      />
    </>
  );
}
