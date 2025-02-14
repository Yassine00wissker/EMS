import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js"
// ✅ Define multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// ✅ Initialize multer
const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,  // 2MB size limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only jpg, jpeg, and png files are allowed'));
        }
        cb(null, true);
    },
});

const addEmployee = async (req, res) => {
    try {

        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        if (!name || !email || !employeeId || !dob || !gender || !maritalStatus || !designation || !department || !salary || !password || !role) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        // ✅ Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered" });
        }

        // ✅ Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // ✅ Create user
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "", // ✅ Check if file exists
        });

        const savedUser = await newUser.save();

        // ✅ Create employee record
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee created successfully" });
    } catch (error) {
        console.error("Error in addEmployee:", error);
        return res.status(500).json({ success: false, error: "Server error in employee creation" });
    }
};
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', { password: 0 }).populate("department")
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employees server error" })

    }
}
const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        let employee;
        employee = await Employee.findById({ _id: id }).populate('userId', { password: 0 }).populate("department")
        if(!employee){
            employee = await Employee.findOne({ userId: id })
            .populate('userId', { password: 0 })
            .populate("department")
        }
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employees server error" })

    }
}

const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById({_id: id})
        if(!employee){
            return res.status(404).json({ success: false, error: " employee not found" })
        }
        const user = await User.findById({_id: employee.userId})
        if(!user){
            return res.status(404).json({ success: false, error: " user not found" })
        }
        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
            maritalStatus,
            designation,
            salary,
            department
        })
        if(!updateUser || !updateEmployee){
            return res.status(404).json({ success: false, error: "document not found" })
        }
        return res.status(200).json({success: true, message:"employee updated"})
    } catch (error) {
        return res.status(500).json({success: false, error: "update employees server error" })
    }
}
const fetchEmployeesByDepId = async (req,res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.find({ department: id })
        return res.status(200).json({ success: true,employees: employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employeesByDepId server error" })
    }
}
export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId};
