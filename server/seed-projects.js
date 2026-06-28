const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const projects = [
  {
    title: "Oya Kekars",
    tag: "E-Commerce Web App",
    description: "A premium luxury cake ordering platform built for Pune's most beloved European bakery.",
    link: "https://oya-kekars.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Vanguard FinTech",
    tag: "Mobile App",
    description: "A completely redesigned mobile banking experience prioritizing speed and user trust.",
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Luminary AI",
    tag: "SaaS Platform",
    description: "A cutting-edge generative AI dashboard tailored for enterprise marketing teams.",
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    // Check if they already exist
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(projects);
      console.log('Projects seeded successfully!');
    } else {
      console.log('Projects already exist in the database. Skipping seed.');
    }
    
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
