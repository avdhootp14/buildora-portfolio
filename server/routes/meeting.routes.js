const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const auth = require('../middleware/auth');

// POST schedule a meeting (Public)
router.post('/', async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    const meeting = await newMeeting.save();
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all meetings (Admin Only)
router.get('/', auth, async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ date: 1 });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update meeting status (Admin Only)
router.put('/:id', auth, async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
