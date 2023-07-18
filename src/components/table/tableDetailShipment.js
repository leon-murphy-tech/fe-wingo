export function name(params) {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.invoice_detail?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{values.invoice_detail.indexOf(item) + 1}</TableCell>
                <InvoiceItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  name={item.name}
                  description={item.description}
                  qty={item.qty}
                  price={item.price}
                  onDeleteItem={(index) => remove(index)}
                  onEditItem={handleChange}
                  Blur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
    </>
  );
}
