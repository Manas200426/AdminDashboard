let users = [
    { id: 1, name: "Manas Kulkarni",email : "manaskulkarni22@gmail.com" , role: "Admin", status: "Active" },
    { id: 2, name: "Prayag Chavan", email : "pcprag@gmail.com",role: "Editor", status: "Inactive" },
  ];
  
  export const fetchUsers = () => Promise.resolve(users);
  
  export const addUser = (user) => {
    users.push({ id: users.length + 1, ...user });
    return Promise.resolve(user);
  };
  
  export const updateUser = (id, updatedUser) => {
    users = users.map((user) => (user.id === id ? updatedUser : user));
    return Promise.resolve(updatedUser);
  };
  
  export const deleteUser = (id) => {
    users = users.filter((user) => user.id !== id);
    return Promise.resolve(id);
  };
  