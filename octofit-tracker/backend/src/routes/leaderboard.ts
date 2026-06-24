import { Router } from 'express'
import Leaderboard from '../models/leaderboard.js'

const router = Router()

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find().populate('user team').sort({ score: -1 }).lean()
  res.json({ leaderboard: entries })
})

export default router
