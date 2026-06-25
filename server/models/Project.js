const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  link: { type: String },
  githubLink: { type: String },
  technologies: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
