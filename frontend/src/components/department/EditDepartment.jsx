import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function EditDepartment() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [department, setDepartment] = useState({ dep_name: "", description: "" });
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            }
            catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchDepartments();
    }, [])
    const handelChange = (e) => {
        const { name, value } = e.target
        setDepartment({ ...department, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:3000/api/department/${id}`, department, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

return (
    <div className="container mt-4">
        <div className="card shadow p-4">
            <h3 className="text-center text-dark mb-3">Edit Department</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="dep_name" className="form-label">Department Name</label>
                    <input
                        onChange={handelChange}
                        type="text"
                        className="form-control"
                        name="dep_name"
                        value={department.dep_name}
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
                        value={department.description}
                        placeholder="Enter Description"
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">Edit Department</button>
            </form>
        </div>
    </div>
)
}
export default EditDepartment