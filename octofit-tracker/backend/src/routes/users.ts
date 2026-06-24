import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ users: [] })
})

router.post('/', (req, res) => {
  // placeholder: create user
  res.status(201).json({ user: req.body })
})

router.get('/:id', (req, res) => {
  res.json({ user: { id: req.params.id } })
})

export default router
