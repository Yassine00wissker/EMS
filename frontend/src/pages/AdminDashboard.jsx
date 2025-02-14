import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSideBar from '../components/dashboard/AdminSideBar';
import NavBar from '../components/dashboard/NavBar';
import AdminSummary from '../components/dashboard/AdminSummary';
import { Outlet } from 'react-router-dom';

function AdminDashboard() {
    const { user } = useAuth();

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <AdminSideBar />

            {/* Main Content */}
            <div className="flex-grow-1">
                {/* Navbar (placed inside the main content area) */}
                <NavBar />
                <div className="container mt-4">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
