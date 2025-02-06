import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import { VscVerified } from "react-icons/vsc";
import { MdModeEditOutline } from "react-icons/md";
import axios from 'axios';
import styles from './SettingsTable.module.css';
import { edituserDetailError } from '../Interface/Login.interface';

const SettingsTable: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [rows, setRows] = React.useState<any[]>([]);
  const [newFirstName, setNewFirstName] = React.useState('');
  const [newLastName, setNewLastName] = React.useState('');
 
  const [loading, setLoading] = React.useState(false);
  
  const [edituserdetailsError, setEditUserDetailsError] = React.useState<edituserDetailError>({
    firstnameError: '',
    lastnameError: '',
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/users/');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleView = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteDialogOpen = (user: any) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/users/users/${selectedUser.id}`);
        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedUser.id));
        setDeleteOpen(false);
        setLoading(false);
      } catch (error) {
        console.error('Error deleting user:', error);
        setLoading(false);
      }
    }
  };

  const handleAccept = async (id: string) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/users/verify/${id}`, { isVerified: true });
      if (response.status === 200) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, isVerified: true } : row
          )
        );
        fetchUsers();
      }
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteOpen(false);
  };

  const handleEditDialogOpen = async (user: any) => {
    setSelectedUser(user);
    const id = user.id;
    try {
      const response = await axios.get(`http://localhost:5000/users/usersData/${id}`);
      const userData = response.data;
      setNewFirstName(userData.firstname);
      setNewLastName(userData.lastname);
      setEditOpen(true);
    } catch (error) {
      console.error('Error fetching user details for edit:', error);
    }
  };

  const handleEditSubmit = async () => {
    let isValid = true;
    // Validation
    if (newFirstName.trim() === '') {
      setEditUserDetailsError((prevState) => ({
        ...prevState,
        firstnameError: 'First name is required.',
      }));
      isValid = false;
    }
    if (newLastName.trim() === '') {
      setEditUserDetailsError((prevState) => ({
        ...prevState,
        lastnameError: 'Last name is required.',
      }));
      isValid = false;
    }

    if (isValid) {
      try {
        setLoading(true);
        await axios.put(`http://localhost:5000/users/users/updateUser/${selectedUser.id}`, {
          firstname: newFirstName,
          lastname: newLastName,
        });
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === selectedUser.id
              ? { ...row, firstname: newFirstName, lastname: newLastName }
              : row
          )
        );
        fetchUsers();
        setEditOpen(false);
        setLoading(false);
      } catch (error) {
        console.error('Error updating user:', error);
        setLoading(false);
      }
    }
  };

  const handleCloseEditDialog = () => {
    setEditOpen(false);
 
    setEditUserDetailsError({
      firstnameError: '',
      lastnameError: '',
    });
  };

  return (
    <>
      <h1 className={styles.heading}>User Details</h1>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead className={styles.tableHeader}>
            <TableRow className={styles.heading}>
              <TableCell className={styles.tableCell}>Username</TableCell>
              <TableCell className={styles.tableCell}>Email</TableCell>
              <TableCell className={styles.tableCell}>Role</TableCell>
              <TableCell className={styles.tableCell}>isVerified</TableCell>
              <TableCell className={styles.tableCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow className={styles.tableRow}>
                <TableCell colSpan={5} align="center" className={styles.noDataCell}>
                  <h1>No users available</h1>
                </TableCell>
              </TableRow>
            )}

            {rows.map((row) => (
              <TableRow key={row.id} className={styles.tableRow}>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.email_id}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell className={row.is_verified ? styles.verified : styles.notVerified}>
                  {row.is_verified ? 'Verified' : 'Not Verified'}
                </TableCell>
                <TableCell className={styles.iconbaground}>
                  <IconButton onClick={() => handleView(row)} className={styles.iconButton}>
                    <IoEyeOutline />
                  </IconButton>

                  {row.is_verified && (
                    <IconButton onClick={() => handleEditDialogOpen(row)} className={styles.iconButton}>
                      <MdModeEditOutline />
                    </IconButton>
                  )}

                  {!row.is_verified && (
                    <IconButton onClick={() => handleAccept(row.id)} className={styles.iconButton}>
                      <VscVerified />
                    </IconButton>
                  )}

                  <IconButton onClick={() => handleDeleteDialogOpen(row)} className={styles.iconButton}>
                    <RiDeleteBin7Line />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={open} onClose={handleClose} className={styles.dialog}>
          <DialogTitle className={styles.dialogTitle}>User Details</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <div>
                <p><strong>Username:</strong> {selectedUser.userName}</p>
                <p><strong>Email:</strong> {selectedUser.email_id}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>isVerified:</strong> {selectedUser.is_verified ? 'Verified' : 'Not Verified'}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" className={`${styles.button} ${styles.cancelButton}`}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={deleteOpen} onClose={handleCloseDeleteDialog} className={styles.dialog}>
          <DialogTitle className={styles.dialogTitle}>Delete Confirm</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <div>
                <p><strong>Are you sure you want to delete this user?</strong> {selectedUser.userName}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary" className={`${styles.button} ${styles.cancelButton}`}>Cancel</Button>
            <Button onClick={handleDelete} color="secondary" className={`${styles.button} ${styles.deleteButton}`} disabled={loading}>Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={editOpen} onClose={handleCloseEditDialog} className={styles.dialog}>
          <DialogTitle className={styles.dialogTitle}>Edit User</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <div className={styles.paragrap}>
                <p>Email</p>
                <TextField size="small" value={selectedUser.email_id} disabled className={styles.textField} />
                <p>FirstName</p>
                <TextField
                  size="small"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  className={`${styles.textField} ${styles.inputBaseRoot}`}
                />
                <p style={{marginTop: "-13px" ,whiteSpace: "preserve", color: 'red', fontSize: '11px' }}>
                  {edituserdetailsError.firstnameError ? edituserdetailsError.firstnameError :" "}
                </p>
                <p>LastName</p>
                <TextField
                  size="small"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  className={`${styles.textField} ${styles.inputBaseRoot}`}
                />
                <p style={{marginTop: "-13px" ,whiteSpace: "preserve", color: 'red', fontSize: '11px' }}>
                  {edituserdetailsError.lastnameError ? edituserdetailsError.lastnameError :" "}
                </p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary" className={`${styles.button} ${styles.cancelButton}`}>Cancel</Button>
            <Button onClick={handleEditSubmit} color="secondary" className={`${styles.button} ${styles.updateButton}`} disabled={loading}>Update</Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
};

export default SettingsTable;
