import React, { useState } from "react";
import RoleList from "../components/RoleManagement/RoleList";
import RoleForm from "../components/RoleManagement/RoleForm";

const RoleManagement = () => {
  const [editingRole, setEditingRole] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = () => {
    setEditingRole(null);
    setRefreshKey((prev) => prev + 1); // Triggers re-fetch in RoleList
  };

  return (
    <div>
      <RoleList key={refreshKey} onEdit={setEditingRole} /> {/* Fix */}
      {editingRole && ( /* Show form only when editing */
        <RoleForm roleToEdit={editingRole} onSave={handleSave} />
      )}
    </div>
  );
};

export default RoleManagement;
