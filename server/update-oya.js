const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    // Mongoose prevents updating createdAt if timestamps: true is on.
    // We can bypass this by using timestamps: false for this specific update
    const project = await Project.findOneAndUpdate(
      { title: 'Oya Kekars' },
      { $set: { createdAt: new Date() } },
      { new: true, timestamps: false }
    );
    
    if (project) {
      console.log('Successfully forced updated Oya Kekars createdAt to appear first!');
    } else {
      console.log('Project not found.');
    }
    
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
