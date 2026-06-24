import { Router } from 'express'
import Team from '../models/team.js'

const router = Router()

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean()
  res.json({ teams })
})

router.post('/', async (req, res) => {
  const team = await Team.create(req.body)
  res.status(201).json({ team })
})

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members')
  if (!team) return res.status(404).json({ error: 'not found' })
  res.json({ team })
})

export default router
