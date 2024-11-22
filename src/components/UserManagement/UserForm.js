import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../../mock/userApi";

const UserForm = ({ userToEdit, onSave }) => {
  const [formData, setFormData] = useState(
    userToEdit || { name: "", email: "", status: "Active" }
  );

  useEffect(() => {
    setFormData(userToEdit || { name: "", email: "", status: "Active" }); // Fix
  }, [userToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updateUser(formData.id, formData).then(onSave);
    } else {
      addUser(formData).then(onSave);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{formData.id ? "Edit User" : "Add User"}</h2>
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
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
