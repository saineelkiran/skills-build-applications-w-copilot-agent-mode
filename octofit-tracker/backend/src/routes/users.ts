import { Router } from 'express'
import User from '../models/user.js'

const router = Router()

router.get('/', async (_req, res) => {
  const users = await User.find().lean()
  res.json({ users })
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json({ user })
})

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'not found' })
  res.json({ user })
})

export default router
