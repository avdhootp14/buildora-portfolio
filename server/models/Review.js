const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  clientName: { 
    type: String, 
    required: true 
  },
  clientRole: { 
    type: String 
  },
  quote: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true,
    min: 1,
    max: 5,
    default: 5
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
