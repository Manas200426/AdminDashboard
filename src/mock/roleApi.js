let roles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  ];
  
  export const fetchRoles = () => Promise.resolve(roles);
  
  export const addRole = (role) => {
    roles.push({ id: roles.length + 1, ...role });
    return Promise.resolve(role);
  };
  
  export const updateRole = (id, updatedRole) => {
    roles = roles.map((role) => (role.id === id ? updatedRole : role));
    return Promise.resolve(updatedRole);
  };
  
  export const deleteRole = (id) => {
    roles = roles.filter((role) => role.id !== id);
    return Promise.resolve(id);
  };
  