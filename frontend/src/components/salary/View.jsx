import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function View() {
    const { id } = useParams();
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    let sno = 1;

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setSalaries(response.data.salary);
                    setFilteredSalaries(response.data.salary);
                }
            } catch (error) {
                console.error("Error fetching salary:", error);
            }
        };

        fetchSalaries();
    }, [id]);

    const filterSalaries = (e) => {
        const query = e.target.value.toLowerCase();
        const filteredRecords = salaries.filter((salary) =>
            salary.employeeId?.employeeId?.toLowerCase().includes(query)
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <>
            <div className="p-2">
                <h2 className="text-center mb-4">Salary History</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="🔍 Search By Emp ID"
                        onChange={filterSalaries}
                    />
                </div>
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                        <tr>
                            <th>SNO</th>
                            <th>EMP ID</th>
                            <th>SALARY</th>
                            <th>ALLOWANCE</th>
                            <th>DEDUCTION</th>
                            <th>TOTAL</th>
                            <th>PAY DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.length > 0 ? (
                            filteredSalaries.map((salary) => (
                                <tr key={salary._id}>
                                    <td>{sno++}</td>
                                    <td>{salary.employeeId?.employeeId || "N/A"}</td>
                                    <td>{salary.basicSalary}</td>
                                    <td>{salary.Allowances}</td>
                                    <td>{salary.Deductions}</td>
                                    <td>{salary.netSalary}</td>
                                    <td>{new Date(salary.payDate).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </>
    );
}

export default View;
