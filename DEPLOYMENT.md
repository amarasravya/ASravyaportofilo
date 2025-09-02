# Vercel Deployment Guide (Monorepo: React + Express)

This project deploys the React frontend as a static site and the Express backend as a serverless function on Vercel.

## Files added/updated
- vercel.json (at project root): routes /api/* to backend serverless; everything else to the React build
- backend/server.js: exports the Express app and only listens locally

## Prerequisites
- Vercel CLI installed: `npm i -g vercel`
- Git repository connected (optional but recommended)

## Configure Environment Variables (Vercel Project)
Set these in the Vercel Dashboard (Project → Settings → Environment Variables) for the Serverless backend:

- NODE_ENV=production
- FRONTEND_URL=https://<your-vercel-frontend-domain>
- EMAIL_USER=<gmail-or-smtp-username>
- EMAIL_PASS=<app-password-or-smtp-password>
- CONTACT_EMAIL=<destination-inbox>

You can also set any variables used by your server (PORT is managed by Vercel automatically).

## Deploy via CLI
From the project root:

1. First deployment (creates the project)
   vercel

   - Answer prompts: 
     - “Set up and deploy …?” → Yes
     - “Link to existing project?” → No (or Yes if you have one)
     - “What’s your project’s name?” → sravya-portfolio (or any)
     - “In which directory is your code located?” → .

2. Production deployment
   vercel --prod

Vercel will:
- Build the frontend using `@vercel/static-build` (runs `npm run build` in `frontend/`)
- Deploy the backend as a serverless function at `backend/server.js`
- Route `/api/*` to the backend and all other routes to the frontend build

## Deploy via GitHub Import
1. Push this repo to GitHub
2. Import into Vercel (New Project → Import Git Repository)
3. Root directory: use the repository root
4. Build & Output Settings
   - Framework Preset: Other
   - Build Command: (leave blank; vercel.json uses `@vercel/static-build`)
   - Output Directory: (leave blank; vercel.json sets `build` for frontend)
5. Add Environment Variables (same as above)
6. Deploy

## Post-deploy
- Frontend: https://<your-project>.vercel.app
- Backend API: https://<your-project>.vercel.app/api/health, /api/portfolio, /api/contact

## Notes
- Local development remains the same: `npm run dev` from the root
- If you see 404s for client routes, ensure the vercel.json route to `frontend/build/$1` is present
- If contact form emails fail in production, verify EMAIL_USER/PASS and that your provider allows SMTP from serverless
- For Gmail, use App Passwords; consider SendGrid/Mailgun for production reliability
