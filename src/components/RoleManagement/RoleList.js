import React, { useState, useEffect } from "react";
import { Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Box, Typography } from '@mui/material';
import { fetchRoles, addRole, updateRole } from "../../mock/roleApi"; // Assuming mock API functions

const RoleList = ({ onEdit }) => {
  const [roles, setRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  // Handle editing role
  const handleEdit = (role) => {
    setSelectedRole(role);
    setOpenDialog(true);  // Open dialog when edit button is clicked
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRole(null); // Clear selected role on close
  };

  // Save or add role
  const handleSaveRole = () => {
    if (selectedRole.id) {
      updateRole(selectedRole.id, selectedRole).then(() => {
        setOpenDialog(false);
        setSelectedRole(null);
        // After updating, fetch updated roles or manually update the state
        fetchRoles().then(setRoles); // Fetch the latest roles
      });
    } else {
      addRole(selectedRole).then(() => {
        setOpenDialog(false);
        setSelectedRole(null);
        // After adding, fetch updated roles or manually update the state
        fetchRoles().then(setRoles); // Fetch the latest roles
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {/* Role Management Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Role Management</Typography>
              <Button variant="contained" color="primary" onClick={() => handleEdit(null)}>
                Add New Role
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Role List Table */}
        <Grid item xs={12}>
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role Name</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{role.permissions.join(", ")}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleEdit(role)} sx={{ marginRight: 1 }}>Edit</Button>
                      <Button variant="outlined" color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Edit Role Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedRole ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            value={selectedRole?.name || ""}
            onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2 }} // Added spacing between inputs
          />
          
          {/* Permissions Field with Multiline */}
          <TextField
            label="Permissions"
            fullWidth
            value={selectedRole?.permissions?.join() || ""}
            onChange={(e) => setSelectedRole({ ...selectedRole, permissions: e.target.value.split(",") })}
            margin="normal"
            variant="outlined"
            multiline
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveRole}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleList;
