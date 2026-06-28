const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    const project = await Project.findOneAndUpdate(
      { title: 'Oya Kekars' },
      { $set: { imageUrl: '/oya_kekars.png' } },
      { new: true }
    );
    
    if (project) {
      console.log('Successfully updated Oya Kekars image URL!');
    } else {
      console.log('Project not found.');
    }
    
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
