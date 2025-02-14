import express from 'express'
import authMiddleware from '../middelware/authMiddlware.js'
import {addDepartment, getDepartments, getDepartment, editDepartment, deleteDepartment} from '../controllers/depatmentControllers.js'

const router = express.Router()

router.post('/add', authMiddleware, addDepartment)
router.get('/', authMiddleware, getDepartments)
router.get('/:id', authMiddleware, getDepartment)
router.put('/:id', authMiddleware, editDepartment)
router.delete('/:id', authMiddleware, deleteDepartment)

export default router