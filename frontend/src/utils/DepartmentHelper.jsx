import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department ",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
];

export const DepartmentButtens = ({ Id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?");
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    onDepartmentDelete(id); // Remove from state immediately
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
    };

    return (
        <div className="d-flex gap-3">
            <button className="btn btn-primary btn-xs"
                onClick={() => navigate(`/admin-dashboard/departments/${Id}`)}
            >Edit</button>
            <button className="btn btn-danger btn-xs"
                onClick={() => handleDelete(Id)}
            >Delete</button>
        </div>
    );
};
