import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add() {
    const navigate = useNavigate()
    const {user} = useAuth()
    const [leave, setLeave] = useState({
        userId: user._id,
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setLeave((prevState) => ({...prevState, [name] : value}))
    };

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3000/api/leave/add`, leave,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data);  

            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`)
            } else {
                alert(response.data.error)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
            console.error("Error fetching employee:", error);  
        } 
    }
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Request for Leave</h2>
            <form className="shadow p-4 bg-light rounded"
            onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label className="form-label">Leave Type</label>
                    <select
                        name="leaveType"
                        className="form-select"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Annual Leave">Annual Leave</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">From Date</label>
                    <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">To Date</label>
                    <input
                        type="date" 
                        name="endDate"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="reason"
                        className="form-control"
                        rows="4"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Add Leave
                </button>
            </form>
        </div>
    );
}

export default Add;
