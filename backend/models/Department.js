import mongoose  from "mongoose";
import Employees from "./Employee.js"
import Leave from "./leave.js"
import Salary from "./Salary.js"
import User from "./User.js"
const departmentSchema = new mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String },
    createAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

departmentSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
    try {
        // Get employees in the department
        const employees = await Employees.find({ department: this._id });
        const empIds = employees.map(emp => emp._id);  // Employee IDs
        const userIds = employees.map(emp => emp.userId);  // Extract the userId for each employee

        console.log("UserIds to delete:", userIds);  // Log userIds for debugging

        // Now delete the users based on the userIds from the employee records
        const deleteUserResponse = await User.deleteMany({ _id: { $in: userIds } });
        console.log("Delete User Response:", deleteUserResponse); // Log the result of the user delete operation

        // Proceed with deleting employees and other associated data
        await Employees.deleteMany({ department: this._id });
        await Leave.deleteMany({ employeeId: { $in: empIds } });
        await Salary.deleteMany({ employeeId: { $in: empIds } });

        next();
    } catch (error) {
        console.error("Error deleting department and associated data:", error);
        next(error);
    }
});


const Department = mongoose.model("Department", departmentSchema)

export default Department;