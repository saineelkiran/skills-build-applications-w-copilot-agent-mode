import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ activities: [] })
})

router.post('/', (req, res) => {
  res.status(201).json({ activity: req.body })
})

router.get('/:id', (req, res) => {
  res.json({ activity: { id: req.params.id } })
})

export default router
