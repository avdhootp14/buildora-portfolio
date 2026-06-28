require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Rate Limiting for all API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 150 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/weblinq-portfolio')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/contacts', require('./routes/contact.routes'));
app.use('/api/meetings', require('./routes/meeting.routes'));
app.use('/api/team', require('./routes/team.routes'));

// Basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Weblinq Portfolio API' });
});

// Root route so Render domain doesn't show "Cannot GET /"
app.get('/', (req, res) => {
  res.json({ message: 'Weblinq Backend API is running successfully!' });
});

// Stats route for Admin Dashboard
app.get('/api/stats', require('./middleware/auth'), async (req, res) => {
  try {
    const Project = require('./models/Project');
    const Contact = require('./models/Contact');
    const Meeting = require('./models/Meeting');

    const [projectsCount, contactsCount, meetingsCount] = await Promise.all([
      Project.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Meeting.countDocuments({ status: { $in: ['pending', 'confirmed'] } }) // Count pending and confirmed as upcoming
    ]);

    res.json({
      projects: projectsCount,
      contacts: contactsCount,
      meetings: meetingsCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
