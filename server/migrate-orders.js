const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    // Set Oya Kekars to 1
    await Project.findOneAndUpdate({ title: 'Oya Kekars' }, { $set: { sortOrder: 1 } });
    
    // Set Vanguard FinTech to 2
    await Project.findOneAndUpdate({ title: 'Vanguard FinTech' }, { $set: { sortOrder: 2 } });
    
    // Set CutPro to 3
    await Project.findOneAndUpdate({ title: 'CutPro' }, { $set: { sortOrder: 3 } });

    console.log('Successfully initialized custom sort orders for existing projects!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
