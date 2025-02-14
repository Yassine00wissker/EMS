import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus:'',
        designation:'',
        department:'',
        salary:0
    })
    const { id } = useParams()
    const [departments, setDepartments] = useState(null)

     useEffect(() => {
        
            const getDepartments = async () => {
                const departments = await fetchDepartments();
                setDepartments(departments);
            };
            getDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.data);

                if (response.data.success) {
                    const employee = response.data.employee
                    setEmployee((prev) => ({...prev, 
                        name:employee.userId.name,
                        maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department
                    }))
                } else {
                    alert(response.data.error)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }

        fetchEmployee();
    }, []);




    const handleChange = (e) => {
        const { name, value, } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }))
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`http://localhost:3000/api/employee/${id}`,
                employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <>{departments && employee ? (
        <div className="container">
            <div className="card shadow p-3">
                <h3 className="text-center text-dark mb-3">Edit Employee</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Name */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Name</label>
                            <input type="text"
                                value={employee.name}
                                className="form-control"
                                name="name"
                                placeholder="Insert Name"
                                onChange={handleChange}
                                required />
                        </div>


                        {/* Marital Status */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Marital Status</label>
                            <select className="form-select" name="maritalStatus" onChange={handleChange}
                             value={employee.maritalStatus}>
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </div>

                        {/* Designation */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Designation</label>
                            <input type="text" className="form-control" name="designation" placeholder="Designation" onChange={handleChange} 
                             value={employee.designation}/>
                        </div>

                        {/* Department */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Department</label>
                            <select className="form-select" name="department" onChange={handleChange}
                            value={employee.department}
                            required>
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Salary */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Salary</label>
                            <input type="text" className="form-control" name="salary" required placeholder="Salary" onChange={handleChange} 
                            value={employee.salary}/>
                        </div>

                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">Save</button>
                </form>
            </div>
        </div>
    ) : <div>Loading...</div>}</>
    );
};

export default Edit;
