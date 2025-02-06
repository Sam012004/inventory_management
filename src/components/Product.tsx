import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { IoAddCircleOutline, IoEyeOutline } from "react-icons/io5";
import axios from 'axios';
import styles from './Product.module.css';
import { MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin7Line } from 'react-icons/ri';

const ProductTable: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [addProductOpen, setAddProductOpen] = React.useState(false);
  const [rows, setRows] = React.useState<any[]>([]);
  const [newProduct, setNewProduct] = React.useState({ name: '', quantity: '', price: '' });
  const [loading, setLoading] = React.useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/allproducts');
      console.log('Response data:', response.data);

     
      if (response.data && Array.isArray(response.data.products)) {
        setRows(response.data.products);
      } else {
        console.error('Expected response data to have "products" as an array but got:', response.data);
        setRows([]); 
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProductDialogOpen = () => {
    setAddProductOpen(true);
  };

  const handleCloseAddProductDialog = () => {
    setAddProductOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewProduct((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddProductSubmit = async () => {
    let isValid = true;

    if (newProduct.name.trim() === '') {
      isValid = false;
    }
    if (newProduct.quantity.trim() === '' || isNaN(Number(newProduct.quantity))) {
      isValid = false;
    }
    if (newProduct.price.trim() === '' || isNaN(Number(newProduct.price))) {
      isValid = false;
    }

    if (isValid) {
      try {
        setLoading(true);
        await axios.post('http://localhost:5000/product/addProduct', {
          productname: newProduct.name,
          quantity: Number(newProduct.quantity),
          price: Number(newProduct.price),
        });
        fetchProducts();
        setAddProductOpen(false);
        setLoading(false);
        setNewProduct({ name: '', quantity: '', price: '' }); 
      } catch (error) {
        console.error('Error adding product:', error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <h1 className={styles.heading}>Product Details</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProductDialogOpen}
        className={styles.addButtontop}
      >
        <IoAddCircleOutline style={{ marginRight: '8px' }} />
        <p>Add Product</p>
      </Button>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead className={styles.tableHeader}>
            <TableRow className={styles.heading}>
              <TableCell className={styles.tableCell}>Product Name</TableCell>
              <TableCell className={styles.tableCell}>Quantity</TableCell>
              <TableCell className={styles.tableCell}>Price</TableCell>
              <TableCell className={styles.tableCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow className={styles.tableRow}>
                <TableCell colSpan={4} align="center" className={styles.noDataCell}>
                  <h1>No products available</h1>
                </TableCell>
              </TableRow>
            )}

            {/* Map over rows only if it is an array */}
            {Array.isArray(rows) &&
              rows.map((row) => (
                <TableRow key={row.id} className={styles.tableRow}>
                  <TableCell>{row.productname}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell className={styles.iconbaground}>
                    <IconButton className={styles.iconButton}>
                      <IoEyeOutline />
                    </IconButton>
                    <IconButton className={styles.iconButton}>
                      <MdModeEditOutline />
                    </IconButton>
                    <IconButton className={styles.iconButton}>
                      <RiDeleteBin7Line />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Product Dialog */}
      <Dialog open={addProductOpen} onClose={handleCloseAddProductDialog} className={styles.dialog}>
        <DialogTitle className={styles.dialogTitle}>Add Product</DialogTitle>
        <DialogContent>
          <div className={styles.paragrap}>
            <p>Product Name</p>
            <TextField
              size="small"
              value={newProduct.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`${styles.textField} ${styles.inputBaseRoot}`}
            />
            <p>Quantity</p>
            <TextField
              size="small"
              type="number"
              value={newProduct.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              className={`${styles.textField} ${styles.inputBaseRoot}`}
            />
            <p>Price</p>
            <TextField
              size="small"
              type="number"
              value={newProduct.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className={`${styles.textField} ${styles.inputBaseRoot}`}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddProductDialog} color="primary" className={`${styles.button} ${styles.cancelButton}`}>Cancel</Button>
          <Button onClick={handleAddProductSubmit} color="secondary" className={`${styles.button} ${styles.addvalueButton}`} disabled={loading}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductTable;
