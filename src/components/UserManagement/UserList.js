import React, { useState, useEffect } from "react";
import { Grid, Box, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import { fetchUsers, deleteUser, addUser, updateUser } from "../../mock/userApi"; // Assuming mock API functions

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenDialog(true); // Open dialog for editing
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog
  };

  const handleSaveUser = () => {
    if (selectedUser.id) {
      updateUser(selectedUser.id, selectedUser).then(() => {
        setOpenDialog(false); // Close dialog after saving
        fetchUsers().then(setUsers); // Fetch updated users
      });
    } else {
      addUser(selectedUser).then(() => {
        setOpenDialog(false); // Close dialog after saving
        fetchUsers().then(setUsers); // Fetch updated users
      });
    }
    setSelectedUser(null); // Clear the selected user
  };

  return (
    <Box sx={{ flexGrow: 1, margin: 3 }}>
      <Grid container spacing={3}>
        {/* User List Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Manage Users</Typography>
              <Button variant="contained" color="primary" onClick={() => handleEdit(null)}>
                Add New User
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* User List Table */}
        <Grid item xs={12}>
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleEdit(user)} sx={{ marginRight: 1 }}>Edit</Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={selectedUser?.name || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            fullWidth
            value={selectedUser?.email || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            margin="normal"
            variant="outlined"
          />
          
          {/* Status Dropdown with Select */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={selectedUser?.status || "Active"}
              onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
              defaultValue="Active"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
