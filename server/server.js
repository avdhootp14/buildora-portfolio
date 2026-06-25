require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buildora-portfolio')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/contacts', require('./routes/contact.routes'));
app.use('/api/meetings', require('./routes/meeting.routes'));

// Basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Buildora Portfolio API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
