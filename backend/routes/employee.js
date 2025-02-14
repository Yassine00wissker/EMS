import express from 'express'
import authMiddleware from '../middelware/authMiddlware.js'
import {addEmployee,upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId} from '../controllers/employeeControllers.js'

const router = express.Router()

router.post('/add', authMiddleware, upload.single('profileImage'), addEmployee)
router.get('/', authMiddleware, getEmployees)
router.get('/:id', authMiddleware, getEmployee)
router.put('/:id', authMiddleware, updateEmployee)
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId)

export default router