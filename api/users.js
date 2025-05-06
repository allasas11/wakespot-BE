const express = require('express')
const { register, login, updateUser, getProfile } = require('../controllers/userController')
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/dashboard/profile', getProfile)
router.put('/update', authMiddleWare, updateUser)

module.exports = router


