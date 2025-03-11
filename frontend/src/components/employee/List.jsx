import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

function List() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");  
    const [filteredEmployees, setFilteredEmployees] = useState([]); 

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees
                        .filter((emp) => emp.department && emp.userId) 
                        .map((emp) => ({
                            _id: emp._id,
                            sno: sno++,
                            dep_name: emp.department.dep_name, 
                            name: emp.userId.name, 
                            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A", 
                            profileImage: emp.userId.profileImage ? (
                                <img
                                    src={`http://localhost:3000/${emp.userId.profileImage}`}
                                    alt="Profile"
                                    className="rounded-circle img-fluid"
                                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                />
                            ) : null, // ✅ If no profile image, don't render anything
                            action: <EmployeeButtons Id={emp._id} />,
                        }));

                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };

        fetchEmployees();
    }, []);

    // 🔍 Handle search input change
    const handleSearch = (e) => {
        setSearch(e.target.value);
        const filtered = employees.filter((emp) =>
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="text-primary">Manage Employees</h4>
                <Link to="/admin-dashboard/add-employee" className="btn btn-success">
                    + Add New Employee
                </Link>
            </div>

            {/* 🔍 Search Input */}
            <div className="mb-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search by employee name"
                    value={search}
                    onChange={handleSearch} 
                />
            </div>

            <div style={{ maxHeight: "40rem", overflowY: "auto" }} className="bg-white border rounded shadow p-2">
                <DataTable
                    columns={columns}
                    data={filteredEmployees} 
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

export default List;
