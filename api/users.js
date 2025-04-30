const express = require('express')
const { register, login, updateUser } = require('../controllers/userController')
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router()


router.post('/register', register)
router.post('/login', login)
router.get('/dashboard/profile')
router.put('/update', authMiddleWare, updateUser)

module.exports = router


