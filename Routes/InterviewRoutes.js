const express = require('express')
const router = express.Router()
const { Interview } = require('../models')

// GET /api/interviews/:id
router.get('/:id', async (req, res) => {
  try {
    const interview = await Interview.findByPk(req.params.id)
    if (!interview) return res.status(404).json({ error: 'Not found' })
    res.json(interview)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/interviews/:id
router.patch('/:id', async (req, res) => {
  try {
    const interview = await Interview.findByPk(req.params.id)
    if (!interview) return res.status(404).json({ error: 'Not found' })
    await interview.update(req.body)
    res.json(interview)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/interviews/:id
router.delete('/:id', async (req, res) => {
  try {
    const interview = await Interview.findByPk(req.params.id)
    if (!interview) return res.status(404).json({ error: 'Not found' })
    await interview.destroy()
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router