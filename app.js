const express = require('express')
const process = require("process")
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./db')

app.use(express.json())
app.use(cors())

const userApiRoutes = require('./api/users')
const locationApiRoutes = require('./api/locations')
const instructorApiRoutes = require('./api/instructors')
const equipmentPackageApiRoutes = require('./api/equipmentPackages')
const sessionApiRoutes = require('./api/sessions')
const bookingApiRoutes = require('./api/bookings')

app.use('/api/users', userApiRoutes)
app.use('/api/locations', locationApiRoutes)
app.use('/api/instructors', instructorApiRoutes)
app.use('/api/packages', equipmentPackageApiRoutes)
app.use('/api/sessions', sessionApiRoutes)
app.use('/api/bookings', bookingApiRoutes)

const authMiddleWare = require('./middlewares/authMiddleware')
const rolesMiddleware = require('./middlewares/rolesMiddleware')
const ROLES = require('./config/roles')

const PORT = process.env.PORT || 3015
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
