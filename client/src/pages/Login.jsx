import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user',JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      console.error(err.msg);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-gray-700">Login</h2>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} required className="mb-4 w-full p-2 border border-gray-300 rounded-lg" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={onChange} required className="mb-4 w-full p-2 border border-gray-300 rounded-lg" />
        <button type="submit" className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-900">Login</button>
        <div className='w-full'>
        <div className="w-full flex text-sm gap-1 mt-5 items-center justify-center">
              <p>Don't have an account?</p>
              <Link to="/signup">
                <button className="font-bold">Create an Account</button>
              </Link>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
