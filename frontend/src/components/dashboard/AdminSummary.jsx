import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaUsers, FaBuilding, FaMoneyBillWave, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';

function AdminSummary() {
    const [summary, setSummary] = useState(null); // Set initial state to null
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null); // Added error state for better error handling

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/dashboard/summary', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setSummary(response.data); // Extracting data from the response
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.error); // Handle specific error from the server
                } else {
                    setError("An unexpected error occurred.");
                }
                setLoading(false); // Set loading to false in case of an error
                console.log(error.message);
            }
        };

        fetchSummary();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Improved loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error if any
    }

    return (
        <div className="container mt-3">
            <h3 className="mb-3">Dashboard Overview</h3>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color={"blue"} />
                </div>
                <div className="col-md-4 mb-3">
                    <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color={"green"} />
                </div>
                <div className="col-md-4 mb-3">
                    <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalary} color={"Aquamarine"} />
                </div>
            </div>
            <h3 className="mb-3">Leave Details</h3>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <SummaryCard icon={<FaFileAlt />} text="Leave Applied For" number={summary.leaveSummary.appliedFor} color={"BurlyWood"} />
                </div>
                <div className="col-md-6 mb-3">
                    <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color={"gray"} />
                </div>
                <div className="col-md-6 mb-3">
                    <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.pending} color={"orange"} />
                </div>
                <div className="col-md-6 mb-3">
                    <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color={"red"} />
                </div>
            </div>
        </div>
    );
}

export default AdminSummary;
