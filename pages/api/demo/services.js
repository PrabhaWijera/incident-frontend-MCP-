const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock service data
const services = [
  { id: 1, name: 'User Authentication', status: 'healthy', responseTime: 120, uptime: 99.9 },
  { id: 2, name: 'Payment Gateway', status: 'degraded', responseTime: 450, uptime: 98.5 },
  { id: 3, name: 'Database', status: 'healthy', responseTime: 85, uptime: 99.99 },
  { id: 4, name: 'Email Service', status: 'down', responseTime: 0, uptime: 95.2 },
  { id: 5, name: 'File Storage', status: 'healthy', responseTime: 200, uptime: 99.7 }
];

// GET all services
app.get('/', (req, res) => {
  res.json(services);
});

// GET service by ID
app.get('/:id', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(service);
});

// POST simulate service failure
app.post('/:id/failure', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  
  service.status = 'down';
  service.responseTime = 0;
  
  res.json({ message: 'Service failure simulated', service });
});

// POST simulate service recovery
app.post('/:id/recovery', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  
  service.status = 'healthy';
  service.responseTime = Math.floor(Math.random() * 200) + 50;
  
  res.json({ message: 'Service recovery simulated', service });
});

// GET system metrics
app.get('/metrics/system', (req, res) => {
  const metrics = {
    totalServices: services.length,
    healthyServices: services.filter(s => s.status === 'healthy').length,
    degradedServices: services.filter(s => s.status === 'degraded').length,
    downServices: services.filter(s => s.status === 'down').length,
    averageResponseTime: services.reduce((acc, s) => acc + (s.responseTime || 0), 0) / services.length,
    systemUptime: 99.5
  };
  
  res.json(metrics);
});

module.exports = (req, res) => {
  app(req, res);
};
