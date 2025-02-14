import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const columns = [
    { name: "SNO", selector: row => row.sno, sortable: true },
    { name: "LEAVE TYPE", selector: row => row.leaveType, sortable: true },
    { name: "FROM", selector: row => row.startDate, sortable: true },
    { name: "TO", selector: row => row.endDate, sortable: true },
    { name: "DESCRIPTION", selector: row => row.reason },
    { name: "STATUS", selector: row => row.Status }
];

function List() {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { id } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.leaves.map(leave => ({
                        _id: leave._id,
                        sno: sno++,
                        leaveType: leave.leaveType,
                        startDate: new Date(leave.startDate).toLocaleDateString(),
                        endDate: new Date(leave.endDate).toLocaleDateString(),
                        reason: leave.reason,
                        Status: leave.Status || "Pending"
                    }));
                    setLeaves(data);
                    setFilteredLeaves(data);
                }
            } catch (error) {
                console.error("Error fetching leaves:", error);
            }
        };
        fetchLeaves();
    }, [id]);

    useEffect(() => {
        const filteredData = leaves.filter(leave =>
            leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLeaves(filteredData);
    }, [searchTerm, leaves]);

    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">Manage Leaves</h3>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="🔍 Search by Leave Type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {user.role === "Employee" && (
                    <Link to="/employee-dashboard/add-leave" className="btn btn-primary">
                        Add New Leave
                    </Link>
                )}
            </div>
            <DataTable
                columns={columns}
                data={filteredLeaves}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
                highlightOnHover
                responsive
                className="table table-striped"
            />
        </div>
    );
}

export default List;
