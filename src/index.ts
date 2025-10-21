import express, { Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'development-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Database connection (if DATABASE_URL is provided)
let db: Pool | null = null;
if (process.env.DATABASE_URL) {
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });
  
  db.on('connect', () => {
    console.log('Connected to PostgreSQL database');
  });
  
  db.on('error', (err) => {
    console.error('Database error:', err);
  });
}

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to AgreeToJoin!',
    status: 'running',
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Rate limiter for database test endpoint
const dbTestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Database test endpoint
app.get('/db-test', dbTestLimiter, async (req: Request, res: Response) => {
  if (!db) {
    return res.status(503).json({
      error: 'Database not configured',
      message: 'DATABASE_URL environment variable is not set',
    });
  }

  try {
    const result = await db.query('SELECT NOW()');
    res.json({
      status: 'Database connection successful',
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database configured: ${!!process.env.DATABASE_URL}`);
  console.log(`Gemini API configured: ${!!process.env.GEMINI_API_KEY}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  if (db) {
    db.end().then(() => {
      console.log('Database pool closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
