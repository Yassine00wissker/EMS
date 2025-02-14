import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Add() {
    const navigate = useNavigate()
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary:0,
        Allowances:0,
        Deductions:0,
        payDate:null,
    })
    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        
            const getDepartments = async () => {
                const departments = await fetchDepartments();
                setDepartments(departments);
            };
            getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const departmentId = e.target.value;
        const emps = await getEmployees(departmentId);
        setEmployees(emps);
    };

    const handleChange = (e) => {
        const { name, value, } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }))
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`http://localhost:3000/api/salary/add`, salary, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && error.response.data && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <>{departments  ? (
        <div className="container">
            <div className="card shadow p-3">
                <h3 className="text-center text-dark mb-3">Add Salary</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Department */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Department</label>
                            <select className="form-select" name="department" onChange={handleDepartment}
                            required>
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>
                        {/*  employee */}
                        <div className="col-md-6 mb-3">
    <label className="form-label">Employee</label>
    <select className="form-select" name="employeeId" onChange={handleChange} required>
        <option value="">Select Employee</option>
        {Array.isArray(employees) && employees.length > 0 ? (
            employees.map(emp => (
                <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
            ))
        ) : (
            <option>No employees available</option>
        )}
    </select>
</div>


                        {/* basic salary */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">basic salary</label>
                            <input type="number" className="form-control" name="basicSalary" placeholder="basic salary" onChange={handleChange} 
                            />
                        </div>

                        

                        {/* Allowances */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Allowances</label>
                            <input type="number" className="form-control" name="Allowances" required placeholder="Allowances" onChange={handleChange} 
                            />
                        </div>
                        {/* Deductions */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Deductions</label>
                            <input type="number" className="form-control" name="Deductions" required placeholder="Deductions" onChange={handleChange} 
                            />
                        </div>
                        {/* PayDate */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">PayDate</label>
                            <input type="date" className="form-control" name="payDate" required placeholder="PayDate" onChange={handleChange} 
                            />
                        </div>

                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">Add Salary</button>
                </form>
            </div>
        </div>
    ) : <div>Loading...</div>}</>
    );
};

export default Add;
