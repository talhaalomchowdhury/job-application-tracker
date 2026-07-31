
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { db } = require('./models')
const userRoutes = require('./Routes/UserRoutes')
const applicationRoutes = require('./Routes/ApplicationRoutes')
const interviewRoutes = require('./Routes/InterviewRoutes')

const app = express()
app.use(cors())
app.use(express.json())

function logger(req, nes, next){
    console.log(`${req.method} ${req.url}`)
    next()
}

app.use('/api/users', userRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/interviews', interviewRoutes)

// catch-all for any route that doesn't match the above
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 4000

db.sync()
  .then(() => {
    console.log('DB connected and synced')
    app.listen(PORT, () => console.log(`API running on port ${PORT}`))
  })
  .catch((err) => console.error('DB connection failed:', err))