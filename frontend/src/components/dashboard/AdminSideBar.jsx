import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCogs,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

function AdminSideBar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white vh-100" style={{ width: "250px" }}>
      <h3 className="text-center mb-4">Employee MS</h3>
      
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink 
            to="/admin-dashboard" 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
            end
          >
            <FaTachometerAlt /> <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink 
            to="/admin-dashboard/employees" 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
          >
            <FaUsers /> <span>Employees</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink 
            to="/admin-dashboard/departments" 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
          >
            <FaBuilding /> <span>Departments</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink 
            to="/admin-dashboard/leaves" 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
          >
            <FaCalendarAlt /> <span>Leaves</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink 
            to="/admin-dashboard/salary/add" 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
          >
            <FaMoneyBillWave /> <span>Salary</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink 
            to="/admin-dashboard/setting" 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
          >
            <FaCogs /> <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSideBar;
