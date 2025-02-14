import express from 'express'
import authMiddleware from '../middelware/authMiddlware.js'
import { changePassword } from '../controllers/settingCountoller.js'

const router = express.Router()

router.put('/change-password', authMiddleware, changePassword)

export default router