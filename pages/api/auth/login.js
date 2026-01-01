const jwt = require('jsonwebtoken');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Mock authentication - in production, verify against database
  if (email === 'admin@company.com' && password === 'admin123') {
    const token = jwt.sign(
      { userId: 1, email: 'admin@company.com', role: 'admin' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: 1,
        email: 'admin@company.com',
        name: 'Admin User',
        role: 'admin'
      }
    });
  }

  res.status(401).json({ message: 'Invalid credentials' });
}
