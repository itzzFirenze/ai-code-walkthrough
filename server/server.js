import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'

import explainRoutes from './routes/explainRoutes.js'
import authRoutes from './routes/authRoutes.js' 
import walkthroughRoutes from './routes/walkthroughRoutes.js'

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/explain', explainRoutes)
app.use('/api/walkthroughs', walkthroughRoutes)

app.get('/', (req, res) => {
   res.json({ message: "Backend is running" })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server is running on PORT ${PORT}`)
})