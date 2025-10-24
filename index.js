require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize Gemini AI
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

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
app.get('/api/test-db', async (req, res) => {
  try {
    // Test database connection
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT NOW() as current_time, version() as version');
      const dbInfo = result.rows[0];
      
      res.json({ 
        status: 'success',
        message: 'Database connection successful',
        timestamp: dbInfo.current_time,
        database_version: dbInfo.version
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Generate contract endpoint (placeholder implementation)
app.post('/api/generateContract', async (req, res) => {
  try {
    const { 
      partnershipType, 
      partnerNames, 
      businessTerms, 
      additionalClauses 
    } = req.body;

    // Validate required fields
    if (!partnershipType || !partnerNames || !businessTerms) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: partnershipType, partnerNames, and businessTerms are required'
      });
    }

    // Check if Gemini AI is configured
    if (!genAI) {
      return res.status(503).json({
        status: 'error',
        message: 'AI service not configured. Please set GEMINI_API_KEY environment variable.'
      });
    }

    // Prepare contract generation prompt
    const prompt = `Generate a professional partnership contract with the following details:
    
Partnership Type: ${partnershipType}
Partner Names: ${partnerNames.join(', ')}
Business Terms: ${businessTerms}
${additionalClauses ? `Additional Clauses: ${additionalClauses}` : ''}

Please create a comprehensive partnership agreement that includes:
1. Introduction and parties involved
2. Purpose and scope of partnership
3. Terms and conditions
4. Rights and responsibilities
5. Financial arrangements
6. Dispute resolution
7. Termination clauses
8. Signatures section

Format the contract professionally with clear sections and legal language.`;

    // Generate contract using Gemini AI
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const contractText = response.text();

    // Store contract in database (optional - storing metadata)
    try {
      const client = await pool.connect();
      try {
        await client.query(
          `CREATE TABLE IF NOT EXISTS contracts (
            id SERIAL PRIMARY KEY,
            partnership_type VARCHAR(255),
            partner_names TEXT[],
            contract_text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`
        );

        const insertResult = await client.query(
          'INSERT INTO contracts (partnership_type, partner_names, contract_text) VALUES ($1, $2, $3) RETURNING id',
          [partnershipType, partnerNames, contractText]
        );

        const contractId = insertResult.rows[0].id;

        res.json({
          status: 'success',
          message: 'Contract generated successfully',
          contractId: contractId,
          contract: contractText
        });
      } finally {
        client.release();
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Return contract even if database storage fails
      res.json({
        status: 'success',
        message: 'Contract generated successfully (not stored in database)',
        contract: contractText,
        warning: 'Contract was not saved to database'
      });
    }

  } catch (error) {
    console.error('Contract generation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Contract generation failed',
      error: error.message
    });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database configured: ${!!process.env.DATABASE_URL}`);
  console.log(`Gemini AI configured: ${!!process.env.GEMINI_API_KEY}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await pool.end();
    console.log('Database pool closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await pool.end();
    console.log('Database pool closed');
    process.exit(0);
  });
});
