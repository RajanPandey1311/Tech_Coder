import React, { useEffect, useState } from "react";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="relative">
      <div className="flex w-full bg-gray-700 h-20">
        <div className="flex mx-20 items-center justify-between w-full">
          <div>
            <HiMenuAlt1
              size={30}
              className="cursor-pointer text-white"
              onClick={toggleSidebar}
            />
          </div>
          <h1 className="text-sm md:text-2xl text-white">
            I'm Rajan Pandey an enthusiastic Software Developer
          </h1>
          {user && (
            <div className="flex gap-4">
            <div className="flex w-auto p-4 h-auto rounded-full bg-white">
              <p className="capitalize">{user.role}</p>
            </div>
            <button
              onClick={logout}
              className="hover:underline flex w-auto p-4 h-auto rounded-full bg-white"
            >
              Logout
            </button>
          </div>
          )}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 w-64 bg-gray-800 h-full z-20 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <h2 className="text-xl text-white">Menu</h2>
          <HiX
            size={30}
            className="cursor-pointer text-white"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="mt-4">
        {user && user.role === "admin" && (
            <>
              <li className="p-4 text-white hover:bg-gray-700 cursor-pointer">
                <Link to="/user-management">User Management</Link>
              </li>
              <li className="p-4 text-white hover:bg-gray-700 cursor-pointer">
                <Link to="/role-management">Role Management</Link>
              </li>
            </>
          )}
          <li className="p-4 text-white hover:bg-gray-700 cursor-pointer">
            Menu 3
          </li>
          <li className="p-4 text-white hover:bg-gray-700 cursor-pointer">
            Menu 4
          </li>
          <li className="p-4 text-white hover:bg-gray-700 cursor-pointer">
            Menu 5
          </li>
          <li className="p-4 text-white hover:bg-gray-700 cursor-pointer">
            Menu 6
          </li>
          <li className="p-4 text-white hover:bg-gray-700 cursor-pointer">
            Menu 7
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
