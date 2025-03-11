import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add(){
    const navigate = useNavigate()
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})


    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
}, []);




    const handleChange = (e) => {
        const { name, value, files} = e.target;
        if(name === "profileImage"){
        setFormData((prevData)=> ({ ...prevData, [name]: files[0]}));
    } else {
        setFormData((prevData) => ({ ...prevData, [name]: value}))
    }
}

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })

        for (let pair of formDataObj.entries()) {
            console.log(pair[0], pair[1]);  
        }
        
        try {
            const response = await axios.post('http://localhost:3000/api/employee/add',
                formDataObj, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert (error.response.data.error)
            }
        }
    }

    return (
        <div className="container">
            <div className="card shadow p-3">
                <h3 className="text-center text-dark mb-3">Add Employee</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Name */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" placeholder="Insert Name" onChange={handleChange} required/>
                        </div>

                        {/* Email */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Insert Email" onChange={handleChange} required/>
                        </div>

                        {/* Employee ID */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Employee ID</label>
                            <input type="text" className="form-control" name="employeeId" placeholder="Employee ID" onChange={handleChange} required/>
                        </div>

                        {/* Date of Birth */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" name="dob" onChange={handleChange} required/>
                        </div>

                        {/* Gender */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Gender</label>
                            <select className="form-select" name="gender" onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Marital Status */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Marital Status</label>
                            <select className="form-select" name="maritalStatus" onChange={handleChange}>
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </div>

                        {/* Designation */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Designation</label>
                            <input type="text" className="form-control" name="designation" placeholder="Designation" onChange={handleChange} required/>
                        </div>

                        {/* Department */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Department</label>
                            <select className="form-select" name="department" onChange={handleChange} required>
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Salary */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Salary</label>
                            <input type="text" className="form-control" name="salary" placeholder="Salary" onChange={handleChange} required/>
                        </div>

                        {/* Password */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="******" onChange={handleChange} required/>
                        </div>

                        {/* Role */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Role</label>
                            <select className="form-select" name="role" onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>

                        {/* Upload Image */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Upload Image</label>
                            <input type="file" name="profileImage" className="form-control" onChange={handleChange} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">Add Employee</button>
                </form>
            </div>
        </div>
    );
};

export default Add;
