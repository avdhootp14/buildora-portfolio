const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// GET all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST a new project (Admin Only)
router.post('/', auth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// DELETE a project (Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
