import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function View() {
    const { id } = useParams()
    const [employee, setEmployee] = useState(null)  
    const [loading, setLoading] = useState(true)  

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                if (response.data.success) {
                    setEmployee(response.data.employee)
                } else {
                    alert(response.data.error)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
                console.error("Error fetching employee:", error);  
            } finally {
                setLoading(false); 
            }
        }

        fetchEmployee();
    }, [id])  

    if (loading) {
        return <div>Loading...</div>  
    }

    if (!employee) {
        return <div>Employee not found or API error</div>  
    }

    return  (
        <div className="container mt-5 p-3 shadow border bg-light"
        style={{ width: "65rem" }}>
            <h2 className="text-center mb-4">{employee.userId.name} Details</h2>
            <div className="row">
                <div className="col-md-4 text-center">
                    {employee.userId && employee.userId.profileImage ? (
                        <img 
                            src={`http://localhost:3000/${employee.userId.profileImage}`} 
                            alt="Profile" 
                            className="img-fluid rounded-circle" 
                            style={{ width: "150px", height: "150px" }} 
                        />
                    ) : (
                        <div>No profile image available</div>
                    )}
                </div>
                {/* Right column for employee details */}
                <div className="col-md-8">
                    <div className="mb-3">
                        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Department:</strong> {employee.department?.dep_name || "No department assigned"}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Gender:</strong> {employee.gender}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View
