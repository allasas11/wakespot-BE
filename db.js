const mongoose = require('mongoose')
const process = require('process')

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('MongoDB connected')

    } catch (error) {
        console.log('Failed to connect to MongoDB:', error)
    }

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('MongoDB disconnected')
            process.exit(0)
        })
    })
}

connectToDb()