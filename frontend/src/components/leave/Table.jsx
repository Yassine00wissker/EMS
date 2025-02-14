import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeavelHelper";
import axios from "axios";

function Table() {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const fetchLeaves = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/leave", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log("Full API Response:", response.data);

            if (response.data.success) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId?.employeeId || "N/A",
                    name: leave.employeeId?.userId?.name || "Unknown",
                    leaveType: leave.leaveType,
                    department: leave.employeeId?.department?.dep_name || "N/A",
                    days: Math.ceil(
                        (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
                    ),
                    Status: leave.Status,
                    action: <LeaveButtons Id={leave._id} />,
                }));

                console.log("Formatted Data:", data); // Debugging

                setLeaves(data);
                setFilteredLeaves(data);
            }
        } catch (error) {
            console.error("Error fetching leaves:", error);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    // Handle search and filter
    useEffect(() => {
        let filteredData = leaves.filter((leave) =>
            leave.employeeId.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filterStatus) {
            filteredData = filteredData.filter((leave) => leave.Status === filterStatus);
        }

        setFilteredLeaves(filteredData);
    }, [searchTerm, filterStatus, leaves]);

    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">Manage Leaves</h3>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="🔍 Search by Emp ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="d-flex gap-2">
                    <button
                        className={`btn px-4 py-2 rounded-pill fw-bold ${
                            filterStatus === "" ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={() => setFilterStatus("")}
                    >
                        All
                    </button>
                    <button
                        className={`btn px-4 py-2 rounded-pill fw-bold ${
                            filterStatus === "Pending" ? "btn-warning text-white" : "btn-outline-warning"
                        }`}
                        onClick={() => setFilterStatus("Pending")}
                    >
                        Pending
                    </button>
                    <button
                        className={`btn px-4 py-2 rounded-pill fw-bold ${
                            filterStatus === "Approved" ? "btn-success text-white" : "btn-outline-success"
                        }`}
                        onClick={() => setFilterStatus("Approved")}
                    >
                        Approved
                    </button>
                    <button
                        className={`btn px-4 py-2 rounded-pill fw-bold ${
                            filterStatus === "Rejected" ? "btn-danger text-white" : "btn-outline-danger"
                        }`}
                        onClick={() => setFilterStatus("Rejected")}
                    >
                        Rejected
                    </button>
                </div>
            </div>

            {filteredLeaves.length === 0 ? (
                <p className="text-center">No records found.</p>
            ) : (
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
            )}
        </div>
    );
}

export default Table;
