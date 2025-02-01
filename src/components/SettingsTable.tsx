import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const SettingsTable: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [rows, setRows] = React.useState<any[]>([]); 

  const fetchUsers = async () => {
    console.log("userfeting")
    try {
      const response = await axios.get('http://localhost:5000/users/users/');
      setRows(response.data); 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

 
  React.useEffect(() => {
    fetchUsers();
  }, [rows]);

  const handleView = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
     
      await axios.delete(`http://localhost:5000/users/users/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id)); 
      console.log('User deleted with ID:', id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAccept = async (id: string) => {
    try {
 
      await axios.put(`http://localhost:5000/users/users/verify/${id}`, { isVerified: true });
      setRows((prevRows) => {
        return prevRows.map((row) => {
          if (row.id === id) {
            row.isVerified = true; 
          }
          return row;
        });
      });
      console.log('User accepted with ID:', id);
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  };

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>isVerified</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.userName}</TableCell>
           
              <TableCell>{row.email_id}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.is_verified ? 'Verified' : 'Not Verified'}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleView(row)}>View</Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(row.id)}>Delete</Button>
                <Button variant="outlined" color="primary" onClick={() => handleAccept(row.id)}>Accept</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email_id}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>isVerified:</strong> {selectedUser.is_verified ? 'Verified' : 'Not Verified'}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default SettingsTable;
