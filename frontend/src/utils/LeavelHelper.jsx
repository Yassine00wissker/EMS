import { useNavigate } from "react-router-dom";

export const columns = [
    { name: "S No", selector: (row) => row.sno, width: "70px" },
    { name: "Emp ID", selector: (row) => row.employeeId, width: "120px" }, // Make sure it only shows employeeId
    { name: "Name", selector: (row) => row.name, width: "120px" },
    { name: "Leave Type", selector: (row) => row.leaveType, width: "140px" },
    { name: "Department", selector: (row) => row.department, width: "170px" },
    { name: "Days", selector: (row) => row.days, width: "80px" },
    { name: "Status", selector: (row) => row.Status, width: "120px" },
    {
        name: "Action",
        cell: (row) => <LeaveButtons leaveId={row._id} />,
        $center: "true",
    },
];

export const LeaveButtons = ({ leaveId }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/admin-dashboard/leaves/${leaveId}`);
    };

    return (
        <button onClick={handleView} className="btn btn-primary">
            View
        </button>
    );
};
