import React, { useState } from "react";
import UserList from "../components/UserManagement/UserList";
import UserForm from "../components/UserManagement/UserForm";

const UserManagement = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = () => {
    setEditingUser(null); // Clear editing state after save
    setRefreshKey((prev) => prev + 1); // Trigger refresh for UserList
  };

  return (
    <div>
      <UserList key={refreshKey} onEdit={setEditingUser} /> {/* Fix */}
      {editingUser && ( /* Show form only when editing */
        <UserForm userToEdit={editingUser} onSave={handleSave} />
      )}
    </div>
  );
};

export default UserManagement;
