import { Button, Chip, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import { DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, IndeterminateCheckbox } from 'components/third-party/ReactTable';

import Avatar from 'components/@extended/Avatar';
import AlertColumnDelete from 'components/Alert/AlertColumnDelete';
import { SearchField } from 'components/formField';
import { TabaleManifest } from 'components/table';
import { useGetAllUSer } from 'hooks/user/useGetAllUser';
import { useGetUserInfo } from 'hooks/user/useGetUserInfo';
import AddUserDialog from 'sections/user/AddUserDialog';
import { getColorStatusUser, getCountryDisplayName, getLabelStatusUser } from 'utils';
import { useRemoveUser } from 'hooks/user/useRemoveUser';

// ==============================|| INVOICE - LIST ||============================== //

const CustomCell = ({ row }) => {
  const { values } = row;
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Avatar alt="Avatar 1" size="sm" src={values?.avatar} />
      <Stack spacing={0}>
        <Typography variant="subtitle1">{values?.company}</Typography>
        <Typography variant="caption" color="textSecondary">
          {values.email}
        </Typography>
      </Stack>
    </Stack>
  );
};
CustomCell.propTypes = {
  row: PropTypes.object
};

// Status
const StatusCell = ({ row }) => {
  const { values } = row;
  return (
    <Chip
      color={getColorStatusUser(values.status)}
      label={getLabelStatusUser(values.status)}
      size="small"
      sx={{ minWidth: '80px' }}
      variant="light"
    />
  );
};

StatusCell.propTypes = {
  row: PropTypes.object
};

// cel country
const countryCell = ({ row }) => {
  const { values } = row;
  return getCountryDisplayName(values.country);
};
countryCell.propTypes = {
  row: PropTypes.object
};

// Action Cell
const ActionCell = ({ theme, rowValues, onEdit, onView, onDelete }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title="View">
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onView(rowValues);
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
            onEdit(rowValues);
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
            onDelete(rowValues);
          }}
        >
          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

ActionCell.propTypes = {
  rowValues: PropTypes.object,
  theme: PropTypes.object,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func
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

export default function ListAllUserPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [rowValues, setRowValues] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  const [mode, setMode] = useState({
    edit: false,
    view: false,
    add: false
  });

  const { data: listALlUser } = useGetAllUSer();
  const { data: userInfo } = useGetUserInfo(rowValues?.uuid);
  const { mutate: removeUser } = useRemoveUser();

  const handleAddUser = () => {
    setOpenAddModal(true);
    setMode({ ...mode, edit: false, view: false, add: true });
  };

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    // setMode({...mode, });
  };

  const onEdit = (value) => {
    setOpenAddModal(true);
    setMode({ edit: true, view: false, add: false });
    setRowValues(value);
  };

  const onView = (value) => {
    setOpenAddModal(true);
    setMode({ edit: false, view: true, add: false });
    setRowValues(value);
  };

  const onDelete = (value) => {
    setOpenAlert(!openAlert);
    setRowValues(value);
  };

  const onConfirmDelete = () => {
    removeUser(rowValues?.uuid);
  };

  //custome cell
  const cellRole = ({ row }) => {
    const { values } = row;
    switch (values?.role) {
      case 'RL1':
        return 'admin';
      case 'RL2':
        return 'manager';
      case 'RL3':
        return 'customer';
      case 'RL4':
        return 'sale staff';
      default:
        break;
    }
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
        Header: 'user ID',
        accessor: 'uuid',
        disableFilters: true
      },
      {
        Header: 'company',
        accessor: 'company',
        disableFilters: true,
        Cell: CustomCell
      },
      {
        Header: 'Avatar',
        accessor: 'avatar',
        disableSortBy: true
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Name',
        accessor: 'name',
        disableFilters: true
      },
      {
        Header: 'role',
        accessor: 'role',
        className: 'cell-center',
        Cell: cellRole
      },
      {
        Header: 'total Shipment',
        accessor: 'totalShipment',
        className: 'cell-center'
      },
      {
        Header: 'country',
        accessor: 'country',
        Cell: countryCell
      },
      {
        Header: 'status',
        accessor: 'status',
        Cell: StatusCell,
        className: 'cell-center'
      },

      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,

        // eslint-disable-next-line react/prop-types
        Cell: ({ row: { values } }) => <ActionCell theme={theme} onEdit={onEdit} onView={onView} rowValues={values} onDelete={onDelete} />
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <MainCard content={false}>
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
              <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={2}>
                <Button variant="contained" startIcon={<PlusOutlined />} size="small" sx={{ width: '120px' }} onClick={handleAddUser}>
                  Add User
                </Button>

                <CSVExport />
              </Stack>
            </Stack>

            <TabaleManifest columns={columns} data={listALlUser} hiddenColumn={['uuid']} />
          </Stack>
        </ScrollX>
      </MainCard>
      <AddUserDialog
        open={openAddModal}
        setOpen={setOpenAddModal}
        mode={mode}
        data={userInfo}
        setMode={setMode}
        onRemove={onConfirmDelete}
      />
      <AlertColumnDelete
        title={`Are you sure deleted it`}
        open={openAlert}
        handleClose={handleAlertClose}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  );
}
