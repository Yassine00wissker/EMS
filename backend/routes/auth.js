import express from 'express'
import { login ,verify} from '../controllers/authController.js';
import authMiddlware from '../middelware/authMiddlware.js'

const router = express.Router()
router.post('/login', login);
router.get('/verify', authMiddlware, verify);
export default router;