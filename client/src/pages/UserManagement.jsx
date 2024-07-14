import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  console.log(users);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:4000/api/users', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(res.data);
    };

    const fetchRoles = async () => {
      const res = await axios.get('http://localhost:4000/api/roles',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRoles(res.data);
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/users/assign-role', { userId: selectedUser, roleId: selectedRole });
      alert('Role assigned successfully');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-8">User Management</h1>
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select User</label>
          <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Role</label>
          <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-900">Assign Role</button>
      </form>
    </div>
  );
};

export default UserManagement;