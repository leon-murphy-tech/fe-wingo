import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Chip, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// assets
import dayjs from 'dayjs';
import { useGetShipment } from 'hooks';
import { getColorStatus, getCountryDisplayName } from 'utils';
import { useServices } from 'hooks/services/useGetServices';
import { truncate } from 'lodash';

// =========================|| DATA WIDGET - LATEST ORDER ||========================= //

export default function LatestOrder() {
  const { data: shipmentList } = useGetShipment();
  const { getServiceName } = useServices();

  return (
    <MainCard
      title="Latest Order"
      content={false}
      secondary={
        <Link component={RouterLink} to="/shipment/allShipment" color="primary">
          View all
        </Link>
      }
    >
      <TableContainer
        sx={{
          height: '100%'
        }}
      >
        <Table
          sx={{
            minWidth: 350,
            '&,td': {
              minWidth: 120
            },
            '& .text-truncate': {
              maxWidth: 200,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordWrap: 'break-word'
            }
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>SHIPMENT ID</TableCell>
              <TableCell align="center">RECEIVER</TableCell>
              <TableCell align="center">DESTINATION</TableCell>
              <TableCell align="center">SERVICE</TableCell>
              <TableCell align="center">DATE</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipmentList?.slice(0, 4).map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }} align="center">
                  {row?.hawb}
                </TableCell>
                <TableCell align="center">
                  {truncate(row?.receiver_address?.name, {
                    length: 20,
                    separator: /,? +/
                  })}
                </TableCell>
                <TableCell align="center">{getCountryDisplayName(row?.receiver_address?.country)}</TableCell>
                <TableCell align="center">{getServiceName(row?.service_id)}</TableCell>
                <TableCell align="center">{dayjs(row?.created_at).format('DD-MM-YYYY')}</TableCell>
                <TableCell align="center">
                  <Chip color={getColorStatus(row.status)} label={row?.status} size="small" sx={{ minWidth: '90px' }} variant="light" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}
