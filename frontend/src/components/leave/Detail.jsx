import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/leave/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    setLeave(response.data.leave);
                } else {
                    alert(response.data.error);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
                console.error("Error fetching leave details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeave();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>; 
    }

    if (!leave) {
        return <div className="text-center mt-5">Leave details not found</div>;
    }

    const changeStatus = async (id, Status) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/leave/${id}`, { Status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                navigate("/admin-dashboard/leaves");
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
            console.error("Error updating leave status:", error);
        } 
    };

    return (
        <div className="container mt-5 p-4 shadow-lg border rounded bg-light" style={{ maxWidth: "850px" }}>
            <h2 className="text-center mb-4">Leave Details</h2>
            
            <div className="row align-items-center">
                {/* Profile Image */}
                <div className="col-md-4 text-center">
                    <img
                        src={`http://localhost:3000/${leave?.employeeId?.userId?.profileImage || "defaultImage.png"}`}
                        alt="Profile"
                        className="img-fluid rounded-circle shadow"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                </div>

                {/* Employee Details */}
                <div className="col-md-8">
                    <div className="mb-2"><strong>Name:</strong> {leave?.employeeId?.userId?.name || "Not available"}</div>
                    <div className="mb-2"><strong>Employee ID:</strong> {leave?.employeeId?.employeeId || "Not available"}</div>
                    <div className="mb-2"><strong>Leave Type:</strong> {leave?.leaveType || "Not available"}</div>
                    <div className="mb-2"><strong>Reason:</strong> {leave?.reason || "Not available"}</div>
                    <div className="mb-2"><strong>Department:</strong> {leave?.employeeId?.department?.dep_name || "Not assigned"}</div>
                    <div className="mb-2"><strong>Start Date:</strong> {new Date(leave?.startDate).toLocaleDateString() || "Not available"}</div>
                    <div className="mb-2"><strong>End Date:</strong> {new Date(leave?.endDate).toLocaleDateString() || "Not available"}</div>
                    <div className="mt-3">
                        <strong>Status:</strong> 
                        {leave.Status === "Pending" ? (
                            <div className="mt-2 d-flex gap-2">
                                <button 
                                    className="btn btn-success fw-bold px-4 py-2"
                                    onClick={() => changeStatus(leave._id, "Approved")}
                                >
                                    ✅ Approve
                                </button>
                                <button 
                                    className="btn btn-danger fw-bold px-4 py-2"
                                    onClick={() => changeStatus(leave._id, "Rejected")}
                                >
                                    ❌ Reject
                                </button>
                            </div>
                        ) : (
                            <span className={`badge ms-2 ${leave.Status === "Approved" ? "bg-success" : "bg-danger"}`}>
                                {leave.Status}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
