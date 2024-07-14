import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleManagement = () => {
  const [formData, setFormData] = useState({ name: '', menus: [] });
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:4000/api/roles',{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setRoles(res.data);
    };

    fetchRoles();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onMenuChange = e => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      menus: checked ? [...prevState.menus, value] : prevState.menus.filter(menu => menu !== value)
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/roles',{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      } ,formData);
      alert('Role created successfully');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-8">Role Management</h1>
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Role Name</label>
          <input type="text" name="name" value={formData.name} onChange={onChange} required className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Menus</label>
          {roles.map(menu => (
            <div key={menu._id} className="flex items-center mb-2">
              <input type="checkbox" value={menu.name} onChange={onMenuChange} className="mr-2" />
              <label className="text-gray-700">{menu.name}</label>
            </div>
          ))}
        </div>
        <button type="submit" className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-900">Create Role</button>
      </form>
      <div className="mt-8 w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Existing Roles</h2>
        <ul>
          {roles.map(role => (
            <li key={role._id} className="mb-2">{role.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoleManagement;
