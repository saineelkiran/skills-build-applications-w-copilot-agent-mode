import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit'
const PORT = parseInt(process.env.PORT || '8000', 10)

app.get('/health', (_req, res) => {
  res.json({status: 'ok'})
})

async function start() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
