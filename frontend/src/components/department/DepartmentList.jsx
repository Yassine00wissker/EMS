import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtens } from "../../utils/DepartmentHelper";
import axios from "axios";

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.departments.map((dep) => ({
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: <DepartmentButtens Id={dep._id} onDepartmentDelete={handleDepartmentDelete} />
                    }));
                    setDepartments(data);
                    setFilteredDepartments(data); // Initialize filtered data
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchDepartments();
    }, []);

    // Handle department deletion and update state
    const handleDepartmentDelete = (id) => {
        setDepartments((prev) => prev.filter(dep => dep._id !== id));
        setFilteredDepartments((prev) => prev.filter(dep => dep._id !== id));
    };

    // Handle search functionality
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filteredData = departments.filter(dep =>
            dep.dep_name.toLowerCase().includes(value)
        );
        setFilteredDepartments(filteredData);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="text-primary">Manage Departments</h4>
                <Link to="/admin-dashboard/add-department" className="btn btn-success">
                    + Add New Department
                </Link>
            </div>

            {/* Search Input */}
            <div className="mb-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search by department name"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* DataTable with Proper Styling */}
            <div style={{ maxHeight: "40rem", overflowY: "auto" }} className="bg-white border rounded shadow p-2">
                <DataTable
                    columns={columns}
                    data={filteredDepartments}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    highlightOnHover
                    responsive
                    className="table-striped table-hover"
                />
            </div>
        </div>
    );
}

export default DepartmentList;
