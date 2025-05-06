const express = require('express')
const { register, login, updateUser, getProfile, getAllUsers } = require('../controllers/userController')
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getAllUsers)
router.post('/register', register)
router.post('/login', login)
router.get('/dashboard/profile', authMiddleWare, getProfile)
router.put('/update', authMiddleWare, updateUser)

module.exports = router


