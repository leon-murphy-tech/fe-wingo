/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Chip, Stack, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { CSVExport, HeaderSort, TablePagination } from 'components/third-party/ReactTable';
import { DateTimeField, SearchField } from 'components/formField';
import { getColorStatus } from 'utils';
import { renderFilterTypes } from 'utils/react-table';
import { useForm } from 'react-hook-form';
import { PropagateLoader } from 'react-spinners';
/* import { CircularProgress } from '@mui/material';
 */
export function TabaleShipment({ columns, data, loading }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  // const defaultColumn = useMemo(() => ({ Filter: DateColumnFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'status', value: '' }],
      hiddenColumns: ['avatar', 'email'],
      pageIndex: 0,
      pageSize: 5
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setFilter
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const componentRef = useRef(null);

  // ================ Tab ================

  const groups = ['All', 'Pending', 'Pickup', 'Transit', 'Cancel', 'Delivered'];
  const countGroup = data.map((item) => item.status);
  const counts = countGroup.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  const [activeTab, setActiveTab] = useState(groups[0]);

  useEffect(() => {
    setFilter('status', activeTab === 'All' ? '' : activeTab);
  }, [activeTab, setFilter]);

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      date1: null,
      date2: null
    }
  });

  const countStatus = (status) => {
    switch (status) {
      case 'All':
        return data?.length || 0;
      case 'Pending':
        return counts.pending || 0;
      case 'Pickup':
        return counts.pickup || 0;
      case 'Transit':
        return counts.in_transit || 0;
      case 'Delivered':
        return counts.delivered || 0;
      case 'Cancel':
        return counts.cancel || 0;
      default:
        return 0;
    }
  };

  return (
    <>
      <Box sx={{ p: 3, pb: 0, width: '100%' }}>
        <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {groups.map((status, index) => (
            <Tab
              key={index}
              label={status}
              value={status}
              icon={<Chip label={countStatus(status)} color={getColorStatus(status?.toUpperCase())} variant="light" size="small" />}
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>
      <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 3 }}>
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2}>
          <SearchField />
        </Stack>
        <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={matchDownSM ? 1 : 0}>
          <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2} mr={2}>
            <DateTimeField control={control} name="date1" />
            <DateTimeField control={control} name="date2" />
          </Stack>
          {/* <CSVExport data={data} filename={'invoice-list.csv'} /> */}
          <CSVExport />
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups?.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup?.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup?.headers?.map((column, x) => (
                  <TableCell key={x} {...column.getHeaderProps([{ className: column?.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {loading ? (
              <TableRow>
                <TableCell size="100%"></TableCell>
                <TableCell size="100%"></TableCell>
                <TableCell size="100%"></TableCell>
                <TableCell size="100%"></TableCell>
                <TableCell size="100%">
                  <PropagateLoader color="#36d7b7" />
                </TableCell>
                <TableCell size="100%"></TableCell>
                <TableCell size="100%"></TableCell>
                <TableCell size="100%"></TableCell>
              </TableRow>
            ) : (
              page?.map((row, i) => {
                prepareRow(row);
                return (
                  <Fragment key={i}>
                    <TableRow
                      {...row?.getRowProps()}
                      onClick={() => {
                        row?.toggleRowSelected();
                      }}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row?.cells?.map((cell, i) => (
                        <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])} align="center">
                          {cell?.render('Cell')}
                        </TableCell>
                      ))}
                    </TableRow>
                  </Fragment>
                );
              })
            )}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

TabaleShipment.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

TabaleShipment.defaultProps = {
  columns: [],
  data: []
};
