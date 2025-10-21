# Deployment Guide

This guide provides step-by-step instructions for deploying the AgreeToJoin application to Render.

## Prerequisites

Before you begin, make sure you have:

1. A GitHub account
2. A Render account (sign up at https://render.com)
3. Git installed on your local machine
4. Node.js 22.x installed for local development (optional)
5. A Gemini API key from Google AI Studio (https://makersuite.google.com/app/apikey)

## Step 1: Push to GitHub

If you haven't already pushed the code to GitHub, follow these steps:

```bash
# Initialize git repository (if not already initialized)
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit"

# Rename the default branch to main
git branch -M main

# Add your GitHub repository as remote
# Replace <your-username> with your GitHub username
git remote add origin https://github.com/<your-username>/agreetojoin.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Render

### Option A: Using Blueprint (Recommended)

This method uses the `render.yaml` file for automated deployment.

1. Go to [Render Dashboard](https://dashboard.render.com/)

2. Click "New" → "Blueprint"

3. Connect your GitHub account if you haven't already

4. Select the `agreetojoin` repository

5. Render will automatically detect the `render.yaml` file and show you the services it will create:
   - Web Service: agreetojoin-app
   - PostgreSQL Database: agreetojoin-db

6. Click "Apply" to create the services

7. Once created, go to the web service settings and add the `GEMINI_API_KEY` environment variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your Gemini API key

8. (Optional) Add `REMOVE_BG_API_KEY` if you have one

9. The service will automatically deploy

### Option B: Manual Deployment

If you prefer to set up services manually:

#### Create PostgreSQL Database

1. Go to Render Dashboard → "New" → "PostgreSQL"

2. Configure the database:
   - Name: `agreetojoin-db`
   - Database: `agreetojoin`
   - Region: Singapore (or your preferred region)
   - Plan: Free

3. Click "Create Database"

4. Wait for the database to be created and note the Internal Database URL

#### Create Web Service

1. Go to Render Dashboard → "New" → "Web Service"

2. Connect your GitHub repository

3. Configure the service:
   - **Name**: `agreetojoin-app`
   - **Environment**: Node
   - **Region**: Singapore (or same as database)
   - **Branch**: main
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. Click "Advanced" to set environment variables:
   - `NODE_ENV` = `production`
   - `SESSION_SECRET` = (Click "Generate" to create a random value)
   - `DATABASE_URL` = (Paste the Internal Database URL from your PostgreSQL database)
   - `GEMINI_API_KEY` = (Your Gemini API key)
   - `REMOVE_BG_API_KEY` = (Optional - your Remove.bg API key)

5. Click "Create Web Service"

## Step 3: Verify Deployment

Once the deployment is complete:

1. Click on the service URL provided by Render (e.g., `https://agreetojoin-app.onrender.com`)

2. You should see a JSON response:
   ```json
   {
     "message": "Welcome to AgreeToJoin!",
     "status": "running",
     "environment": "production"
   }
   ```

3. Test the health endpoint: `https://your-app-url.onrender.com/health`

4. Test the database connection: `https://your-app-url.onrender.com/db-test`

## Environment Variables Reference

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `development` |
| `SESSION_SECRET` | Yes | Secret key for session encryption | Auto-generated on Render |
| `DATABASE_URL` | Yes | PostgreSQL connection string | Auto-configured on Render |
| `GEMINI_API_KEY` | Yes | Google Gemini API key | None |
| `REMOVE_BG_API_KEY` | No | Remove.bg API key for background removal | None |
| `PORT` | No | Server port (automatically set by Render) | `3000` |

## Troubleshooting

### Build Fails

- Check the build logs in Render dashboard
- Ensure all dependencies are listed in `package.json`
- Verify Node version is set to 22 in `render.yaml`

### Application Won't Start

- Check the service logs in Render dashboard
- Verify all required environment variables are set
- Check that `DATABASE_URL` is correctly configured

### Database Connection Issues

- Verify the database is in the same region as the web service
- Check that `DATABASE_URL` uses the Internal Database URL (not External)
- Ensure the database is running and accessible

### Rate Limiting

The `/db-test` endpoint is rate-limited to 100 requests per IP per 15 minutes to prevent abuse.

## Next Steps

After successful deployment:

1. Set up custom domain (optional)
2. Configure SSL/TLS certificates (automatic with Render)
3. Set up monitoring and alerts
4. Configure auto-deploy on GitHub push
5. Add additional routes and functionality to your application

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- GitHub Issues: https://github.com/<your-username>/agreetojoin/issues
