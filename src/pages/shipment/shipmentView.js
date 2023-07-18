import React from 'react'
import { EditOutlined, ShareAltOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import { Box, Grid, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import logoIcon from 'assets/images/logo-wingo.png';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { useGetShipmentDetail } from 'hooks/shipment/useGetShipmentDetail';
import { useNavigate, useParams } from 'react-router';
import { getCountryDisplayName } from 'utils';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ReactPDF from './ReactPDF'
import AWB from './AWB'
import { Menu, Dropdown, Button, Modal } from 'antd';
import PrintIcon from '@mui/icons-material/Print';

export default function ShipmentViewDetail() {
  const theme = useTheme();
  const navigation = useNavigate();
  const { id } = useParams();

  const { data: shipmentData } = useGetShipmentDetail(id) || {};

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModalAWB = () => {
    setOpen1(true);
  };

  const handleOkAWB = () => {
    setTimeout(() => {
      setOpen1(false);
    }, 3000);
  };

  const handleCancelAWB = () => {
    setOpen1(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" >
        <Button type="primary" onClick={showModal} style={{padding: "10px", display: "flex", flexDirection: "row", alignItems: "center", width: "170px" }} >
          <PrintIcon style={{marginRight: "20px"}} />Print HAWB
        </Button>
      </Menu.Item>
      <Menu.Item key="2" >
        <Button type="primary" onClick={showModalAWB} style={{padding: "10px", display: "flex", flexDirection: "row", alignItems: "center", width: "170px" }} >
          <PrintIcon style={{marginRight: "20px"}} />Print AWB
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <MainCard boxShadow={true} shadow={'rgba(149, 157, 165, 0.2) 0px 8px 24px'}>
      <Stack spacing={2.5}>
        <Box sx={{ p: 0, pb: 0 }}>
          <MainCard content={false} sx={{ p: 1.25, bgcolor: 'primary.lighter', borderColor: theme.palette.primary[100] }}>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <IconButton onClick={() => navigation(`/shipment/editShipment/${shipmentData?.shipment?.hawb}`)}>
                <EditOutlined style={{ color: theme.palette.grey[900] }} />
              </IconButton>
              {/* <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list?.invoice_id}-${list?.customer_name}.pdf`}>
                <IconButton>
                  <DownloadOutlined style={{ color: theme.palette.grey[900] }} />
                </IconButton>
              </PDFDownloadLink> */}

              <Dropdown overlay={menu}>
                <IconButton>
                  <DownloadOutlined style={{ color: theme.palette.grey[900] }} />
                </IconButton>
              </Dropdown>

              {/* // Preview function */}
              <Modal
                open={open}
                title={"Bill " + shipmentData?.shipment.hawb + ".pdf"}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Return
                  </Button>,
                  <PDFDownloadLink key="download" document={<ReactPDF shipment={ shipmentData?.shipment || {} } packageInfo={ shipmentData?.shipment_package_info || [] } product = { shipmentData?.shipment_product_info || [] } />} fileName={"Bill " + shipmentData?.shipment.hawb + ".pdf"}>
                    <Button key="submit" type="primary" onClick={handleOk}>
                      Download
                    </Button>
                  </PDFDownloadLink>,
                ]}
              >
                <PDFViewer style={{width: "950px", height: "650px"}}>
                  <ReactPDF shipment={ shipmentData?.shipment || {} } packageInfo={ shipmentData?.shipment_package_info || [] } product = { shipmentData?.shipment_product_info || [] } />
                </PDFViewer>
              </Modal>

              <Modal
                open={open1}
                title={"AWB " + shipmentData?.shipment.hawb + ".pdf"}
                onOk={handleOkAWB}
                onCancel={handleCancelAWB}
                width={1000}
                footer={[
                  <Button key="back" onClick={handleCancelAWB}>
                    Return
                  </Button>,
                  <PDFDownloadLink key="AWB" document={<AWB shipment={ shipmentData?.shipment || {} } packageInfo={ shipmentData?.shipment_package_info || [] } />} fileName="AWB.pdf">
                    <Button key="submit" type="primary" onClick={handleOkAWB}>
                      Download
                    </Button>
                  </PDFDownloadLink>,
                ]}
              >
                <PDFViewer style={{ width: "950px", height: "650px" }}>
                  <AWB shipment={shipmentData?.shipment || {}} packageInfo={shipmentData?.shipment_package_info || []} />
                </PDFViewer>

              </Modal>

              {/* <ReactToPrint
                trigger={() => (
                  <IconButton>
                    <PrinterFilled style={{ color: theme.palette.grey[900] }} />
                  </IconButton>
                )}
                // content={() => componentRef.current}
              /> */}

              <IconButton>
                <ShareAltOutlined style={{ color: theme.palette.grey[900] }} />
              </IconButton>
            </Stack>
          </MainCard>
        </Box>

        <Box>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Stack direction="row" spacing={2} sx={{}} pl={1}>
                    <img src={logoIcon} alt="wingo" width="150" />
                  </Stack>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Typography variant="subtitle1">{`DATE :`}</Typography>
                    <Typography color="secondary">{dayjs(shipmentData?.shipment?.created_at).format('YYYY-MM-DD')}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Typography sx={{ overflow: 'hidden' }} variant="subtitle1">
                      {`HAWB :`}
                    </Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.hawb}</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">{`Sender Infomation :`}</Typography>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Full Name :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.sender_address?.name}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Company Name :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.sender_address?.company}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Phone :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.sender_address?.phone}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Email :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.sender_address?.email}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Address line 1 :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.sender_address?.address_first}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Address line 2 :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.sender_address?.address_second}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`City:`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.sender_address?.city} - </Typography>
                    <Typography color="secondary">{`State:`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.sender_address?.state}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Country:`}</Typography>
                    <Typography color="secondary">{getCountryDisplayName(shipmentData?.shipment?.sender_address?.country)} - </Typography>
                    <Typography color="secondary">{`Zipcode:`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.sender_address?.zipcode}</Typography>
                  </Stack>
                </Stack>
              </MainCard>
            </Grid>

            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">{`Receiver Infomation :`}</Typography>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Full Name :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.receiver_address?.name}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Company Name :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.receiver_address?.company}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Phone :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.receiver_address?.phone}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Email :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.receiver_address?.email}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Address line 1 :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.receiver_address?.address_first}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Address line 2 :`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.receiver_address?.address_second}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`City:`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.receiver_address?.city} - </Typography>
                    <Typography color="secondary">{`State:`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.receiver_address?.state}</Typography>
                  </Stack>

                  <Stack spacing={0.5} direction="row">
                    <Typography color="secondary">{`Country:`}</Typography>
                    <Typography color="secondary">{getCountryDisplayName(shipmentData?.shipment?.receiver_address?.country)} - </Typography>
                    <Typography color="secondary">{`Zipcode:`}</Typography>
                    <Typography color="secondary">{shipmentData?.shipment?.receiver_address?.zipcode}</Typography>
                  </Stack>
                </Stack>
              </MainCard>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" mb={1}>{`Product Infomation :`}</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">#</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center">Qty</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shipmentData?.shipment_product_info?.map((row, index) => (
                      <TableRow key={row.uuid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.type}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" mb={1}>{`Packge Infomation :`}</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">qty</TableCell>
                      <TableCell align="center">type</TableCell>
                      <TableCell align="center">length</TableCell>
                      <TableCell align="center">width</TableCell>
                      <TableCell align="center">height</TableCell>
                      <TableCell align="center">weight</TableCell>
                      <TableCell align="center">subWeight</TableCell>
                      <TableCell align="center">subVolume</TableCell>
                      <TableCell align="center">subCharge</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shipmentData?.shipment_package_info?.map((row) => (
                      <TableRow key={row?.uuid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{row?.quantity}</TableCell>
                        <TableCell align="center">{row?.type}</TableCell>
                        <TableCell align="center">{row?.length}</TableCell>
                        <TableCell align="center">{row?.width}</TableCell>
                        <TableCell align="center">{row?.height}</TableCell>
                        <TableCell align="center">{row?.weight}</TableCell>
                        <TableCell align="center">{row?.subweight}</TableCell>
                        <TableCell align="center">{row?.subvolume}</TableCell>
                        <TableCell align="center">{row?.subcharge}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* <Grid item xs={12}>
              <Typography variant="h5" mb={1}>{`History Infomation :`}</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="">date</TableCell>
                      <TableCell align="center">status</TableCell>
                      <TableCell align="center">detail</TableCell>
                      <TableCell align="center">location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shipmentData?.shipment_history?.map((row) => (
                      <TableRow key={row?.uuid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="">{dayjs(row?.date).format('YYYY-MM-DD')}</TableCell>
                        <TableCell align="center">{row?.status}</TableCell>
                        <TableCell align="center">{row?.detail}</TableCell>
                        <TableCell align="center">{row?.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid> */}
          </Grid>
        </Box>
      </Stack>
    </MainCard>
  );
}
