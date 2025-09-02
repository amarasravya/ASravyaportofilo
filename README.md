# Amara Sravya - Professional Portfolio

A modern, responsive portfolio website built with React.js frontend and Node.js/Express backend, showcasing my skills, projects, and experience as a Full Stack Developer.

## 🚀 Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Components**: Dynamic content loading and user interactions
- **Contact Form**: Functional contact form with backend integration
- **Project Showcase**: Detailed project presentations with live demos and source code links
- **Skills Visualization**: Interactive skills display with categorization
- **Performance Optimized**: Fast loading times and smooth navigation

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building user interfaces
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **CSS3** - Modern styling with Flexbox and Grid

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Nodemailer** - Email sending functionality
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting middleware

## 📁 Project Structure

```
sravya-portfolio/
├── frontend/                 # React frontend application
│   ├── public/              # Public assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.js    # Navigation component
│   │   │   ├── Home.js      # Homepage component
│   │   │   ├── About.js     # About page component
│   │   │   ├── Projects.js  # Projects showcase
│   │   │   ├── Skills.js    # Skills display
│   │   │   ├── Contact.js   # Contact form
│   │   │   └── Footer.js    # Footer component
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js backend application
│   ├── routes/              # API routes
│   │   ├── portfolio.js     # Portfolio data endpoints
│   │   └── contact.js       # Contact form handling
│   ├── server.js            # Express server setup
│   └── package.json         # Backend dependencies
├── package.json             # Root package.json for scripts
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amarasravya/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In the backend directory, create a .env file
   cd backend
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=amarasravya@gmail.com
   FRONTEND_URL=http://localhost:3000
   ```
   - `MONGO_URI`: Your MongoDB connection string. You can get one for free from MongoDB Atlas.

4. **Seed the Database (Crucial Step)**
   To populate the application with the initial portfolio data, run the seeder script from the root directory.
   ```bash
   node backend/seeder
   ```
   This command reads the data from `backend/data/portfolioData.js` and inserts it into your MongoDB database.

   > **Note:** If you ever update `portfolioData.js`, you must run this command again to see the changes.

5. **Run the application**
   ```bash
   # From the root directory, run both frontend and backend
   npm run dev
   
   # Or run them separately:
   # Backend (from backend directory)
   npm run dev
   
   # Frontend (from frontend directory)
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📧 Contact Form Setup

To enable the contact form functionality:

1. **Gmail Setup** (for development):
   - Enable 2-factor authentication on your Gmail account
   - Generate an app-specific password
   - Use your Gmail address and app password in the `.env` file

2. **Production Setup**:
   - Consider using services like SendGrid, Mailgun, or AWS SES
   - Update the nodemailer configuration in `backend/routes/contact.js`

## 🌐 API Endpoints

### Portfolio Data
- `GET /api/portfolio` - Get all portfolio data
- `GET /api/portfolio/personal` - Get personal information
- `GET /api/portfolio/education` - Get education details
- `GET /api/portfolio/experience` - Get work experience
- `GET /api/portfolio/skills` - Get technical skills
- `GET /api/portfolio/projects` - Get project information
- `GET /api/portfolio/achievements` - Get achievements and certifications

### Contact
- `POST /api/contact` - Send contact form message
- `GET /api/contact/info` - Get contact information

## 🎨 Customization

### Updating Portfolio Data
All portfolio content is managed through a central data file that seeds a MongoDB database.

1.  **Edit the data file**: Open `backend/data/portfolioData.js` and modify the content to reflect your own information (personal details, projects, skills, etc.).
2.  **Re-seed the database**: After saving your changes, run the seeder script again from the project root to update the database.
    ```bash
    node backend/seeder
    ```
Your website will now display the updated content.

### Styling
- Global styles: `frontend/src/App.css`
- Component-specific styles: `frontend/src/components/[Component].css`
- Color scheme and themes can be customized in the CSS files

### Adding New Sections
1. Create a new component in `frontend/src/components/`
2. Add the route in `frontend/src/App.js`
3. Update the navigation in `frontend/src/components/Navbar.js`
4. Add corresponding API endpoints if needed

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Build and Deployment

### Build for Production
```bash
# Build frontend
cd frontend
npm run build

# The build folder will contain the production-ready files
```

### Deployment Options
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean
- **Full Stack**: Heroku, Railway, AWS, Google Cloud

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Amara Sravya**
- GitHub: [@amarasravya](https://github.com/amarasravya)
- LinkedIn: [Amara Sravya](https://www.linkedin.com/in/amara-sravya)
- Email: amarasravya@gmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/amarasravya/portfolio/issues).

## ⭐ Show your support

Give a ⭐️ if this project helped you!
