import express from 'express'
import { getMsg, sendMsg } from '../controllers/messageController.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
const router = express.Router()

router.route('/send/:id').post(isAuthenticated, sendMsg)
router.route('/:id').get(isAuthenticated, getMsg)

export default router
