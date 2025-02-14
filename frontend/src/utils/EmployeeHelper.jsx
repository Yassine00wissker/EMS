import axios from "axios"
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px",
        sortable: true
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "150px"
    },
    {
        name: "dob",
        selector: (row) => row.dob,
        width: "130px",
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action,
        style: { textAlign: "center", width: "150px" },
    }
];

export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get('http://localhost:3000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
    return departments
};

//employees for salary form
export const getEmployees = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.data.success) {
            return response.data.employees || [];  // ✅ Always return an array
        } else {
            console.warn("No employees found for department:", id);
            return [];  // ✅ Return an empty array if no employees found
        }
    } catch (error) {
        console.error("Error fetching employees:", error);
        return [];  // ✅ Return empty array on error
    }
};




export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate();

    

    return (
        <div className="d-flex gap-3">
            <button className="btn btn-info btn-xs"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >View</button>
            <button className="btn btn-primary btn-xs"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}

            >Edit</button>

            <button className="btn btn-warning btn-xs"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >Salary</button>

            <button className="btn btn-danger btn-xs"
                onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            >Leave</button>
        </div>
    );
};
