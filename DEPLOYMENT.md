# Deployment Guide

This guide covers different deployment options for the Amara Sravya Portfolio application.

## 🚀 Deployment Options

### 1. Heroku (Full Stack)

Heroku is great for deploying both frontend and backend together.

#### Prerequisites
- Heroku CLI installed
- Git repository

#### Steps
1. **Create Heroku App**
   ```bash
   heroku create your-portfolio-name
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set CONTACT_EMAIL=amarasravya@gmail.com
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

4. **Open Application**
   ```bash
   heroku open
   ```

### 2. Netlify (Frontend) + Railway (Backend)

This approach separates frontend and backend deployment.

#### Frontend on Netlify

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `build` folder to Netlify
   - Or connect your GitHub repository

3. **Environment Variables**
   - Set `REACT_APP_API_URL` to your backend URL

#### Backend on Railway

1. **Create Railway Project**
   - Connect your GitHub repository
   - Select the backend folder

2. **Environment Variables**
   ```
   NODE_ENV=production
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=amarasravya@gmail.com
   PORT=5000
   ```

### 3. Vercel (Frontend) + Heroku (Backend)

#### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

#### Backend on Heroku
Follow the Heroku backend deployment steps above.

### 4. GitHub Pages (Frontend Only)

For static frontend deployment:

1. **Install gh-pages**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://amarasravya.github.io/portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Configuration for Production

### Backend Configuration

1. **Update CORS settings** in `backend/server.js`:
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? 'https://your-frontend-domain.com' 
       : 'http://localhost:3000',
     credentials: true
   }));
   ```

2. **Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=amarasravya@gmail.com
   FRONTEND_URL=https://your-frontend-domain.com
   ```

### Frontend Configuration

1. **Update API calls** if using separate backend:
   ```javascript
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://your-backend-domain.com' 
     : 'http://localhost:5000';
   ```

2. **Build optimization**:
   ```bash
   npm run build
   ```

## 📱 Mobile Optimization

The portfolio is already optimized for mobile devices with:
- Responsive design
- Touch-friendly interactions
- Optimized images and assets
- Fast loading times

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Configure properly for production
3. **Rate Limiting**: Already implemented in the backend
4. **Input Validation**: Contact form has validation
5. **HTTPS**: Use HTTPS in production

## 📊 Performance Optimization

1. **Frontend**:
   - Code splitting with React.lazy()
   - Image optimization
   - Minification and compression

2. **Backend**:
   - Gzip compression
   - Caching headers
   - Database optimization (if using)

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check CORS configuration
   - Verify frontend and backend URLs

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names and values

3. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Email Not Working**:
   - Verify email credentials
   - Check spam folder
   - Ensure app passwords are used for Gmail

### Logs and Debugging

1. **Heroku Logs**:
   ```bash
   heroku logs --tail
   ```

2. **Railway Logs**:
   - Check deployment logs in Railway dashboard

3. **Netlify Logs**:
   - Check build logs in Netlify dashboard

## 📈 Monitoring

Consider adding:
- Google Analytics for traffic monitoring
- Error tracking (Sentry)
- Performance monitoring
- Uptime monitoring

## 🔄 Continuous Deployment

Set up automatic deployment:
1. Connect GitHub repository
2. Enable automatic deployments
3. Set up branch protection rules
4. Configure build and test pipelines

## 📞 Support

If you encounter issues during deployment:
1. Check the logs for error messages
2. Verify environment variables
3. Test locally first
4. Check platform-specific documentation

For additional help, refer to the main README.md or create an issue in the repository.
