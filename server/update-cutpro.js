const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    const project = await Project.findOneAndUpdate(
      { title: 'Luminary AI' },
      { 
        $set: { 
          title: 'CutPro',
          description: 'A comprehensive SaaS platform for salon shops to seamlessly book appointments and manage operations.'
        } 
      },
      { new: true }
    );
    
    if (project) {
      console.log('Successfully updated Luminary AI to CutPro!');
    } else {
      console.log('Project not found.');
    }
    
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
