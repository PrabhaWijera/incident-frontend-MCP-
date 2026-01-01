const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Incident Schema
const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  status: { type: String, enum: ['open', 'investigating', 'resolved', 'closed'], default: 'open' },
  assignedTo: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Incident = mongoose.model('Incident', incidentSchema);

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// GET all incidents
app.get('/', verifyToken, async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incidents', error: error.message });
  }
});

// POST new incident
app.post('/', verifyToken, async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ message: 'Error creating incident', error: error.message });
  }
});

// PUT update incident
app.put('/:id', verifyToken, async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    
    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: 'Error updating incident', error: error.message });
  }
});

// DELETE incident
app.delete('/:id', verifyToken, async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    
    res.json({ message: 'Incident deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting incident', error: error.message });
  }
});

module.exports = async (req, res) => {
  await connectDB();
  app(req, res);
};
