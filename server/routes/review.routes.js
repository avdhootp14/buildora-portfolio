const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// GET all approved reviews (Public)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all reviews (Admin Only)
router.get('/all', auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new review (Public)
router.post('/', async (req, res) => {
  try {
    const { clientName, clientRole, quote, rating } = req.body;
    const newReview = new Review({
      clientName,
      clientRole,
      quote,
      rating,
      isApproved: false // explicitly ensure it's false
    });
    const review = await newReview.save();
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT toggle approval status (Admin Only)
router.put('/:id/approve', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    review.isApproved = !review.isApproved;
    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a review (Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
