import { Router } from 'express'
import Activity from '../models/activity.js'

const router = Router()

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user workout').lean()
  res.json({ activities })
})

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body)
  res.status(201).json({ activity })
})

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user workout')
  if (!activity) return res.status(404).json({ error: 'not found' })
  res.json({ activity })
})

export default router
