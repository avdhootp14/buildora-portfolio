const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// POST a new contact message (Public)
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET all contacts (Admin Only)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PUT mark contact as read (Admin Only)
router.put('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(contact);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
