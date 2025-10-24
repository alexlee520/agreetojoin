# AgreeToJoin - Store Partnership Management System

A Node.js Express server for managing store partnerships and generating partnership contracts using AI.

## Features

- **Health Check Endpoints**: Monitor server status and uptime
- **Database Integration**: PostgreSQL database for storing contracts and partnership data
- **AI-Powered Contract Generation**: Generate professional partnership contracts using Google's Gemini AI
- **RESTful API**: Clean and simple API for contract management

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Google Gemini API key (for contract generation)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/alexlee520/agreetojoin.git
cd agreetojoin
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your configuration:
- `PORT`: Server port (default: 3000)
- `DATABASE_URL`: PostgreSQL connection string
- `GEMINI_API_KEY`: Your Google Gemini API key
- `SESSION_SECRET`: Secret for session management
- `REMOVE_BG_API_KEY`: (Optional) API key for background removal

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### GET /
Health check endpoint. Returns "Service is running".

### GET /status
Returns server status and timestamp.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-24T10:53:43.529Z"
}
```

### GET /api/test-db
Tests database connectivity and returns database information.

**Response (Success):**
```json
{
  "status": "success",
  "message": "Database connection successful",
  "timestamp": "2025-10-24T10:53:43.529Z",
  "database_version": "PostgreSQL 14.5..."
}
```

**Response (Error):**
```json
{
  "status": "error",
  "message": "Database connection failed",
  "error": "connection error details"
}
```

### POST /api/generateContract
Generates a partnership contract using AI.

**Request Body:**
```json
{
  "partnershipType": "Business Partnership",
  "partnerNames": ["John Doe", "Jane Smith"],
  "businessTerms": "50/50 profit sharing, equal decision-making rights",
  "additionalClauses": "Non-compete clause for 2 years"
}
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "Contract generated successfully",
  "contractId": 123,
  "contract": "PARTNERSHIP AGREEMENT\n\n..."
}
```

**Response (Error - Missing Fields):**
```json
{
  "status": "error",
  "message": "Missing required fields: partnershipType, partnerNames, and businessTerms are required"
}
```

**Response (Error - AI Not Configured):**
```json
{
  "status": "error",
  "message": "AI service not configured. Please set GEMINI_API_KEY environment variable."
}
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | - |
| `SESSION_SECRET` | Secret for session management | Yes | - |
| `REMOVE_BG_API_KEY` | API key for background removal | No | - |

## Deployment

This application is configured for deployment on Render.com. See `render.yaml` for deployment configuration.

### Render Deployment Steps:
1. Push your code to GitHub
2. Connect your repository to Render
3. Render will automatically detect the `render.yaml` file
4. Configure environment variables in Render dashboard
5. Deploy!

## Database Schema

The application automatically creates the following tables:

### contracts
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| partnership_type | VARCHAR(255) | Type of partnership |
| partner_names | TEXT[] | Array of partner names |
| contract_text | TEXT | Generated contract content |
| created_at | TIMESTAMP | Creation timestamp |

## License

ISC

## Author

Alex Lee