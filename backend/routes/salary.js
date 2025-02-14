import express from 'express'
import authMiddleware from '../middelware/authMiddlware.js'
import { addSalary, getSalary} from '../controllers/salaryCountroller.js'

const router = express.Router()

router.post('/add', authMiddleware, addSalary)
router.get('/:id', authMiddleware, getSalary)

export default router