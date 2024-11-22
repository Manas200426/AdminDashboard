import React, { useState } from "react";
import { addRole, updateRole } from "../../mock/roleApi";

// Predefined list of permissions
const predefinedPermissions = ["Read", "Write", "Delete", "Execute"];

const RoleForm = ({ roleToEdit, onSave }) => {
  const [formData, setFormData] = useState(
    roleToEdit || { name: "", permissions: [] }
  );

  React.useEffect(() => {
    setFormData(roleToEdit || { name: "", permissions: [] });
  }, [roleToEdit]); // Fix

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePermission = (permission) => {
    setFormData((prevState) => {
      const permissions = prevState.permissions.includes(permission)
        ? prevState.permissions.filter((perm) => perm !== permission)
        : [...prevState.permissions, permission];

      return { ...prevState, permissions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updateRole(formData.id, formData).then(onSave);
    } else {
      addRole(formData).then(onSave);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{formData.id ? "Edit Role" : "Add Role"}</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Permissions:</label>
        <div>
          {predefinedPermissions.map((permission) => (
            <label key={permission} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                checked={formData.permissions.includes(permission)}
                onChange={() => togglePermission(permission)}
              />
              {permission}
            </label>
          ))}
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default RoleForm;
