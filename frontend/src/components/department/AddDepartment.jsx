import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDepartment() {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    })
    const navigate = useNavigate()
    const handelChange = (e) => {
        const {name,value} = e.target
        setDepartment({...department, [name] : value})
    }

    const handelSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/department/add',department, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert (error.response.data.error)
            }
        }
    }
    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h3 className="text-center text-dark mb-3">Add Department</h3>
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label htmlFor="dep_name" className="form-label">Department Name</label>
                        <input 
                            onChange={handelChange}
                            type="text" 
                            className="form-control" 
                            name="dep_name" 
                            placeholder="Enter Department Name"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea 
                            onChange={handelChange}
                            className="form-control" 
                            name="description" 
                            rows="3" 
                            placeholder="Enter Description"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Add Department</button>
                </form>
            </div>
        </div>
    );
}

export default AddDepartment;
