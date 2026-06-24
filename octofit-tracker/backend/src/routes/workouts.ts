import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ workouts: [] })
})

router.post('/', (req, res) => {
  res.status(201).json({ workout: req.body })
})

router.get('/:id', (req, res) => {
  res.json({ workout: { id: req.params.id } })
})

export default router
