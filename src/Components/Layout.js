import React from "react";
import { NavLink, Outlet } from "react-router-dom"; // Import Outlet
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Employees from "./Employees";

const Layout = () => {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/admin'; // back to login
  }

  return (
    <div className="container mx-auto px-4 py-4 min-h-screen">
      <nav className="mb-8 bg-white shadow-md rounded-lg p-4">
        <ul className="flex justify-between items-center">
          <div className="flex space-x-4">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-gray-700 hover:text-blue-500 ${
                    isActive ? "bg-gray-200" : "bg-white"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/employees"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-gray-700 hover:text-blue-500 ${
                    isActive ? "bg-gray-200" : "bg-white"
                  }`
                }
              >
                Employees
              </NavLink>
            </li>
            {/* Add more navigation links here */}
          </div>
          <li>
            <NavLink
              to="/"
              className="px-3 py-2 rounded text-white bg-red-500 hover:bg-red-700"
              onClick={logout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="bg-white shadow-md rounded-lg p-8">
        <Outlet /> {/* Render child content */}
        {location.pathname === '/admin/employees' && <Employees />} {/* Render Employees for /employees */}
      </main>
    </div>
  );
};

export default Layout;
