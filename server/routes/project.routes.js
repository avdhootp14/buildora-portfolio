const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// GET all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ sortOrder: 1, updatedAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new project (Admin Only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) {
      projectData.imageUrl = req.file.path; // Cloudinary URL
    }
    const newProject = new Project(projectData);
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a project (Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a project (Admin Only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) {
      projectData.imageUrl = req.file.path;
    }
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectData },
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
