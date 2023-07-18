// material-ui
import { PlusOutlined } from '@ant-design/icons';
import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ManifestHistoryItem from 'components/molecules/ManifestHistoryItem';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';

export function ListManifestHistory({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Manifest_history'
  });

  return (
    <>
      <Typography variant="h5" my={2}>
        Manifest History
      </Typography>

      <TableContainer sx={{ maxHeight: '320px', overflowY: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Flight</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((item, index) => (
              <TableRow key={item.id}>
                <ManifestHistoryItem control={control} key={item.id} index={index} onDeleteItem={(index) => remove(index)} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={8}>
          <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}>
            <Button
              color="primary"
              startIcon={<PlusOutlined />}
              onClick={() => {
                append(
                  {
                    date: dayjs(),
                    flight: '',
                    detail: '',
                    location: ''
                  },
                  {
                    focusName: `Manifest_history.${fields.length}.flight`
                  }
                );
              }}
              variant="dashed"
              sx={{ bgcolor: 'transparent !important' }}
            >
              Add Item
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ pt: 2.5, pb: 2.5 }}>
          <Stack direction="row" justifyContent="center" spacing={5}>
            <Button variant="contained" sx={{ width: '200p' }} type="submit">
              <Typography variant="h6" color="white">
                update
              </Typography>
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

ListManifestHistory.propTypes = {
  control: PropTypes.any
  // data: PropTypes.array
};
