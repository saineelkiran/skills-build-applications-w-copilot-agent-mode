import express from 'express'
import apiRouter from './routes/index.js'
import { connectDb } from './database.js'

const app = express()
app.use(express.json())

const PORT = parseInt(process.env.PORT || '8000', 10)

// Health check with MongoDB connection state
app.get('/health', (_req, res) => {
  const dbState = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'
  res.json({
    status: 'ok',
    database: dbState,
    mongooseState: process.env.MONGODB_URI ? 'configured' : 'default'
  })
})

// Mount API routes under /api
app.use('/api', apiRouter)

async function start() {
  try {
    await connectDb()

    // Codespaces-aware host and external URL
    const CODESPACE = process.env.CODESPACE_NAME
    const HOST = CODESPACE ? '0.0.0.0' : 'localhost'
    const externalUrl = CODESPACE
      ? `https://${CODESPACE}-8000.githubpreview.dev`
      : `http://localhost:${PORT}`

    app.listen(PORT, HOST, () => {
      console.log(`Backend running on ${externalUrl}`)
      console.log(`API base: ${externalUrl}/api`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
