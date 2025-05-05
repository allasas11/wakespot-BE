const express = require('express')
const process = require("process")
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./db')

app.use(express.json())
app.use(cors())

const userApiRoutes = require('./api/users')
const locationApiRoutes = require('./routes/locations')
const instructorApiRoutes = require('./routes/instructors')
const equipmentPackageApiRoutes = require('./routes/equipmentPackages')
const sessionApiRoutes = require('./routes/sessions')
const bookingApiRoutes = require('./routes/bookings')

app.use('/api/users', userApiRoutes)
app.use('/api/locations', locationApiRoutes)
app.use('/api/instructors', instructorApiRoutes)
app.use('/api/packages', equipmentPackageApiRoutes)
app.use('/api/sessions', sessionApiRoutes)
app.use('/api/bookings', bookingApiRoutes)

const PORT = process.env.PORT || 3010
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
