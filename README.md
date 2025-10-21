# AgreeToJoin

A Node.js application built with Express and TypeScript, designed to be deployed on Render.

## Prerequisites

- Node.js 22.x
- PostgreSQL database (optional, for development)
- Gemini API Key (for AI features)

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/alexlee520/agreetojoin.git
cd agreetojoin
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
NODE_ENV=development
SESSION_SECRET=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/agreetojoin
GEMINI_API_KEY=your-gemini-api-key
PORT=3000
```

5. Run the development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
```

7. Start the production server:
```bash
npm start
```

## Deployment to Render

### Method 1: Using render.yaml (Recommended)

This repository includes a `render.yaml` file for automated deployment.

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/agreetojoin.git
git push -u origin main
```

2. Go to [Render Dashboard](https://dashboard.render.com/)

3. Click "New" → "Blueprint"

4. Connect your GitHub repository

5. Render will automatically detect the `render.yaml` and create the necessary services

6. Set the `GEMINI_API_KEY` environment variable in the Render dashboard (it's marked as `sync: false` for security)

### Method 2: Manual Setup

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/agreetojoin.git
git push -u origin main
```

2. Go to Render → New → Web Service

3. Connect your GitHub repository

4. Configure the service:
   - **Environment**: Node
   - **Node version**: 22
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. Set environment variables:
   - `NODE_ENV=production`
   - `SESSION_SECRET=<random-string>`
   - `DATABASE_URL=<Render PostgreSQL Internal URL>`
   - `GEMINI_API_KEY=<your-api-key>`

6. Create a PostgreSQL database on Render and link it to your web service

## Environment Variables

- `NODE_ENV`: Environment (development/production)
- `SESSION_SECRET`: Secret key for session encryption (auto-generated on Render)
- `DATABASE_URL`: PostgreSQL connection string (auto-configured on Render)
- `GEMINI_API_KEY`: Google Gemini API key for AI features
- `REMOVE_BG_API_KEY`: (Optional) Remove.bg API key for background removal
- `PORT`: Server port (default: 3000)

## API Endpoints

- `GET /`: Welcome message and status
- `GET /health`: Health check endpoint
- `GET /db-test`: Database connection test

## Project Structure

```
agreetojoin/
├── src/
│   └── index.ts        # Main application file
├── dist/               # Compiled JavaScript (generated)
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── render.yaml         # Render deployment configuration
└── README.md           # This file
```

## License

ISC