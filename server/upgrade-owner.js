require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/weblinq-portfolio')
  .then(async () => {
    try {
      const AdminUser = require('./models/AdminUser');
      const result = await AdminUser.updateMany(
        { isVerified: true, role: { $ne: 'owner' } },
        { $set: { role: 'owner' } }
      );
      console.log(`Upgraded ${result.modifiedCount} existing verified admins to owner status.`);
    } catch (err) {
      console.log('Error upgrading admins:', err.message);
    }
    process.exit(0);
  });
