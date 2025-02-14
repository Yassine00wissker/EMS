import Department from "../models/Department.js";
import Employee from "../models/Employee.js"
import Leave from "../models/leave.js";

const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        
        const totalDepartments = await Department.countDocuments();

        const totalSalaries = await Employee.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
        ]);

        const employeeAppliedForLeave = await Leave.distinct('employeeId');

        const leavesStatus = await Leave.aggregate([
            { $group: {
                _id: "$Status", // Group by Status
                count: { $sum: 1 } // Count occurrences of each status
            }}
        ]);

        const leaveSummary = {
            appliedFor: employeeAppliedForLeave.length,
            approved: leavesStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: leavesStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: leavesStatus.find(item => item._id === "Pending")?.count || 0,
        };

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalary: totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        });
    } catch (error) {
        console.error(error); // Log the error for better debugging
        return res.status(500).json({
            success: false,
            error: "Dashboard summary error"
        });
    }
};

export {getSummary}