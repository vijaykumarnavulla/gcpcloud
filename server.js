const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Enable JSON parsing for POST requests
app.use(express.json());

// Health check endpoint (Cloud Run requires / endpoint)
app.get('/', (req, res) => {
  res.status(200).send('Hello from Cloud Run! 🚀 ' );
});

// Example API endpoint
app.get('/api/hello/:name', (req, res) => {
  const name = req.params.name || 'World';
  res.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    deployed: 'via GitHub + Cloud Build'
  });
});

// Echo endpoint (test path params)
app.get('/echo/:text', (req, res) => {
  res.json({
    original: req.params.text,
    echoed: req.params.text.toUpperCase(),
    method: 'GET'
  });
});

// POST example
app.post('/api/data', (req, res) => {
  res.json({
    received: req.body,
    processed: 'OK'
  });
});

// Health check for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health: http://localhost:${port}/health`);
});

module.exports = app;
