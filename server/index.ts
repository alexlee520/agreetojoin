import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// POST /api/stores endpoint - Store partner application
app.post('/api/stores', async (req: Request, res: Response) => {
  console.log('--- [BACKEND] Received POST /api/stores request ---');
  
  try {
    // Extract data from request body
    const { storeName, ownerName, address, phone, email } = req.body;
    
    // Basic validation
    if (!storeName || !ownerName || !address) {
      return res.status(400).json({
        error: 'Missing required fields: storeName, ownerName, and address are required'
      });
    }
    
    // TODO: Add database logic here
    // For now, we'll simulate successful processing
    
    // Simulate some async processing
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('[BACKEND] Successfully processed store application.');
    
    // Return success response
    return res.status(201).json({
      message: 'Store application submitted successfully',
      store: {
        storeName,
        ownerName,
        address,
        phone,
        email,
        status: 'pending'
      }
    });
    
  } catch (error) {
    console.error('!!! [BACKEND] Error processing /api/stores:', error);
    
    return res.status(500).json({
      error: 'Internal server error while processing store application'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
