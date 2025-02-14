import express from 'express'
import authMiddleware from '../middelware/authMiddlware.js'
import { addLeave, getLeaves,getLeave, getLeaveDetail, updateLeave } from '../controllers/leaveController.js'

const router = express.Router()

router.post('/add', authMiddleware, addLeave)
router.get('/:id', authMiddleware, getLeaves)
router.put('/:id', authMiddleware, updateLeave)
router.get('/detail/:id', authMiddleware, getLeaveDetail)
router.get('/', authMiddleware, getLeave)
 
export default router