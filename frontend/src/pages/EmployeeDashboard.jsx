import React from "react"
import Sidebar from "../components/employeDashboard/Sidebar"
import {Outlet} from "react-router-dom"
import NavBar from "../components/dashboard/NavBar"
function EmployeeDashboard(){
    return(
<div className="d-flex">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main Content */}
            <div className="flex-grow-1">
                {/* Navbar (placed inside the main content area) */}
                <NavBar />
                <div className="container mt-4">
                    <Outlet/>
                </div>
            </div>
        </div>    )
}
export default EmployeeDashboard