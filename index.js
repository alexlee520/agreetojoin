const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// 根路徑回應，用於 Render 健康檢查或瀏覽器直接存取
app.get('/', (req, res) => {
  res.send('Service is running');
});

// Status endpoint
app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test database endpoint (placeholder implementation)
app.get('/api/test-db', (req, res) => {
  // TODO: Implement actual database connection test
  res.json({ 
    message: 'Database connection test endpoint',
    status: 'not implemented'
  });
});

// Generate contract endpoint (placeholder implementation)
app.post('/api/generateContract', (req, res) => {
  // TODO: Implement contract generation logic
  res.json({ 
    message: 'Contract generation endpoint',
    status: 'not implemented'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
