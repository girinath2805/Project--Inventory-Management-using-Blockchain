const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')


const app = express()
connectDB()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use('/api/auth',require('./Routes/Admin'))
app.use('/api/private',require('./Routes/private'))
app.use(errorHandler)

const server = app.listen(PORT,() => console.log(`Server running on ${PORT}`))
process.on("unhandledRejection",(err,promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})
