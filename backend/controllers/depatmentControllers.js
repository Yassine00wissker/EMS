import Department from "../models/Department.js";

const getDepartments = async (req,res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments});
    } catch (error) {
        return res.status(500).json({success: false, error: "get department server error"})

    }
}

const addDepartment = async (req,res) => {
    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success: true, department: newDep})
    } catch (error) {
        return res.status(500).json({success: false, error: "add department server error"})
    }
}
const getDepartment = async (req,res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById({_id: id})
        return res.status(200).json({success: true, department})
    } catch (error) {
        return res.status(500).json({success: false, error: "get department server error"})
    }
}

const editDepartment = async (req,res) => {
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updateDep = await Department.findByIdAndUpdate({_id: id},{
            dep_name,
            description
        })
        return res.status(200).json({success: true, updateDep})

    } catch (error) {
        return res.status(500).json({success: false, error: "edit department server error"})
    }
}
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDep = await Department.findById(id);

        if (!deleteDep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        await deleteDep.deleteOne();
        return res.status(200).json({ success: true, message: "Department deleted successfully", deleteDep });

    } catch (error) {
        console.error("Error deleting department:", error);
        return res.status(500).json({ success: false, error: "Failed to delete department" });
    }
};
export {addDepartment, getDepartments, getDepartment, editDepartment, deleteDepartment}

