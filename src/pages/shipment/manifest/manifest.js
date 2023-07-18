/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { Button, Chip, Stack, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons';

import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, IndeterminateCheckbox } from 'components/third-party/ReactTable';

import AlertColumnDelete from 'components/Alert/AlertColumnDelete';
import Loader from 'components/Loader';
import { SearchField } from 'components/formField';
import { TabaleManifest } from 'components/table';
import dayjs from 'dayjs';
import { useGetManifest } from 'hooks/shipment/useGetManifest';
import { useNavigate } from 'react-router';
import { getColorStatusManifest, getCountryDisplayName, getLabelManifest } from 'utils';
import { useDeteteManifest } from 'hooks/manifest/useDeleteManifest';

// ==============================|| INVOICE - LIST ||============================== //

// Status
const StatusCell = ({ row }) => {
  const { values } = row;
  return (
    <Chip
      color={getColorStatusManifest(values.status)}
      label={getLabelManifest(values.status)}
      size="small"
      sx={{ minWidth: '80px' }}
      variant="light"
    />
  );
};

StatusCell.propTypes = {
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

export default function ManifestPage() {
  const navigation = useNavigate();
  const theme = useTheme();
  const [alertPopup, SetAlertPopup] = useState(false);
  const [manifestId, setManifestId] = useState();

  const { data: listManifest, isLoading } = useGetManifest();
  const { mutate: deleteManifest } = useDeteteManifest();

  const handleAlertClose = () => {
    SetAlertPopup(!alertPopup);
  };

  const onDelete = () => {
    deleteManifest(manifestId);
  };

  const CustomerCellCountry = ({ row }) => {
    return getCountryDisplayName(row?.values?.['country']);
  };

  const CustomerCellDate = ({ row }) => {
    const { values } = row;
    return dayjs(values.date).format('DD-MM-YYYY');
  };

  //Action Cell
  const ActionCell = ({ row }) => {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
        <Tooltip title="View">
          <IconButton
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
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
              navigation(`/shipment/manifestShipment/edit/${row.values.manifest_id}`);
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
              setManifestId(row.values.manifest_id);
            }}
          >
            <DeleteTwoTone twoToneColor={theme.palette.error.main} />
          </IconButton>
        </Tooltip>
      </Stack>
    );
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
        Header: 'MNF ID',
        accessor: 'manifest_id',
        disableFilters: true
      },
      {
        Header: 'MAWB',
        accessor: 'airway_bill_number',
        disableFilters: true
      },
      {
        Header: 'country',
        accessor: 'country',
        Cell: CustomerCellCountry
      },
      {
        Header: 'totalHwb',
        accessor: 'total_hawb',
        className: 'cell-center'
      },
      {
        Header: 'total Pkg',
        accessor: 'totalPkg',
        className: 'cell-center'
      },
      {
        Header: 'total g.w',
        accessor: 'total_gross_weight',
        className: 'cell-center'
      },
      {
        Header: 'total AW',
        accessor: 'totalAweight',
        className: 'cell-center'
      },

      {
        Header: 'date',
        accessor: 'date',
        Cell: CustomerCellDate
      },
      {
        Header: 'status',
        accessor: 'status',
        disableFilters: true,
        Cell: StatusCell
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ActionCell
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
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
                <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<PlusOutlined />}
                    size="small"
                    sx={{ width: '130px' }}
                    onClick={() => navigation(`/shipment/manifestShipment/create`)}
                  >
                    Add new
                  </Button>

                  <CSVExport />
                </Stack>
              </Stack>

              <TabaleManifest columns={columns} data={listManifest.manifestShipment} />
            </Stack>
          </ScrollX>
          <AlertColumnDelete
            title={`Are you sure deleted it`}
            open={alertPopup}
            handleClose={handleAlertClose}
            onConfirmDelete={onDelete}
          />
        </MainCard>
      )}
    </>
  );
}
