import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCogs,
  FaCalendarAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

function SideBar() {

  const {user} = useAuth()

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white vh-100" style={{ width: "250px" }}>
      <h3 className="text-center mb-4">Employee MS</h3>
      
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink 
            to="/employee-dashboard" 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
            end
          >
            <FaTachometerAlt /> <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink 
            to={`/employee-dashboard/profile/${user._id}`} 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
          >
            <FaUsers /> <span>My Profile</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink 
            to={`/employee-dashboard/leaves/${user._id}`}
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
          >
            <FaBuilding /> <span>Leaves</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink 
            to={`/employee-dashboard/salary/${user._id}`} 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
          >
            <FaCalendarAlt /> <span>Salary</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink 
            to="/employee-dashboard/setting" 
            className={({ isActive }) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-white"}`}
          >
            <FaCogs /> <span>Setting</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
