const express = require('express')
const router = express.Router()
const { Application, Interview, User } = require('../models')

// GET /api/applications  
router.get('/', async (req, res) => {
  try {
    const { status, userId } = req.query
    const where = {}
    if (status) where.status = status
    if (userId) where.userId = userId

    const applications = await Application.findAll({
      where,
      include: [Interview, { model: User, attributes: ['id', 'email', 'name'] }],
      order: [['createdAt', 'DESC']],
    })
    res.json(applications)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/applications/:id
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [Interview, { model: User, attributes: ['id', 'email', 'name'] }],
    })
    if (!application) return res.status(404).json({ error: 'Not found' })
    res.json(application)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/applications
router.post('/', async (req, res) => {
  try {
    const application = await Application.create(req.body)
    res.status(201).json(application)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PATCH /api/applications/:id
router.patch('/:id', async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) return res.status(404).json({ error: 'Not found' })
    await application.update(req.body)
    res.json(application)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PATCH /api/applications/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const application = await Application.findByPk(req.params.id)
    if (!application) return res.status(404).json({ error: 'Not found' })
    await application.update({ status })
    res.json(application)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/applications/:id
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) return res.status(404).json({ error: 'Not found' })
    await application.destroy()
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/applications/:applicationId/interviews
router.get('/:applicationId/interviews', async (req, res) => {
  try {
    const interviews = await Interview.findAll({
      where: { applicationId: req.params.applicationId },
      order: [['interviewDate', 'ASC']],
    })
    res.json(interviews)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/applications/:applicationId/interviews
router.post('/:applicationId/interviews', async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.applicationId)
    if (!application) return res.status(404).json({ error: 'Application not found' })

    const interview = await Interview.create({
      ...req.body,
      applicationId: req.params.applicationId,
    })
    res.status(201).json(interview)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router