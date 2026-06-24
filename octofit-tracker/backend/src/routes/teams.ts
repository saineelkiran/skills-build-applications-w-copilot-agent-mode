import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ teams: [] })
})

router.post('/', (req, res) => {
  res.status(201).json({ team: req.body })
})

router.get('/:id', (req, res) => {
  res.json({ team: { id: req.params.id } })
})

export default router
