const express = require('express');
const router = express.Router();

// Portfolio data based on Amara Sravya's resume
const portfolioData = {
  personal: {
    name: "Amara Sravya",
    title: "Full Stack Developer",
    email: "amarasravya65@gmail.com",
    phone: "+91 7995340740",
    location: "Nellore, Andhra Pradesh, India",
    linkedin: "https://www.linkedin.com/in/amara-sravya",
    github: "https://github.com/amarasravya",
    summary: "Passionate Full Stack Developer with expertise in MERN stack, Python, and modern web technologies. Experienced in building scalable web applications and solving complex problems through innovative solutions."
  },
  
  education: [
    {
      id: 1,
      institution: "Audisankara Institute of Technology",
      degree: "Computer Science Artificial Intelligence B.Tech",
      location: "Gudur, Andhra Pradesh",
      period: "October 2022 - October 2026",
      cgpa: "8.0"
    },
    {
      id: 2,
      institution: "Sri Siva Sai College",
      degree: "MPC Higher Secondary Education",
      location: "Kakinada, Andhra Pradesh",
      period: "2020 - 2022"
    },
    {
      id: 3,
      institution: "Narasimharaju English Medium High School",
      degree: "Secondary School Education",
      location: "Kakinada, Andhra Pradesh",
      period: "2019 - 2020",
      cgpa: "10.0"
    }
  ],

  experience: [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Vibha Ladies | Freelance",
      period: "Feb 2024 - April 2024",
      location: "Remote",
      description: "Developed a responsive e-commerce website using HTML, CSS, JavaScript, Node.js, and MySQL. Improved load speed by 30% and handled user registration for 400+ through interactive UI and seamless user experience."
    },
    {
      id: 2,
      title: "Web Developer",
      company: "Value Laden | Online",
      period: "2024 - Present",
      location: "Online",
      description: "Working on web development projects with focus on creating user-friendly interfaces and implementing modern web technologies for enhanced user experience."
    }
  ],

  skills: {
    programmingLanguages: ["Python", "C Language", "Data Structures & Algorithms", "Java", "JavaScript", "HTML", "CSS"],
    frameworks: ["React.js", "Node.js", "Express.js", "Flask"],
    databases: ["MySQL", "SQL", "Database management (DBMS)", "Oops"],
    tools: ["Git", "GitHub", "VS Code", "Networking protocols", "Application software", "Embedded Systems Development", "SDLC", "Software Engineering", "Troubleshooting"]
  },

  projects: [
    {
      id: 1,
      title: "Logic Games Website",
      description: "Developed an interactive Logic Games website with brain-training challenges using HTML, CSS, JavaScript, Node.js, and MySQL. Enhanced user engagement through gamification and responsive design.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
      liveUrl: "https://amarasravya.github.io/LOGIC-GAMES/",
      githubUrl: "https://github.com/amarasravya/LOGIC-GAMES",
      period: "2024"
    },
    {
      id: 2,
      title: "Simple Tracker Backend",
      description: "Developed a MERN stack backend app using React, Flask, and Python with user authentication, CRUD operations, and search filter features for efficient task tracking.",
      technologies: ["React", "Flask", "Python", "MongoDB"],
      githubUrl: "https://github.com/amarasravya/simple-tracker-backend",
      period: "2024"
    },
    {
      id: 3,
      title: "MERN URL Shortener",
      description: "Developed a MERN stack platform to convert long URLs into short shareable links with click tracking analytics for user engagement insights.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB"],
      liveUrl: "https://amarasravya.github.io/mern-url-shortener/",
      githubUrl: "https://github.com/amarasravya/mern-url-shortener",
      period: "2024"
    },
    {
      id: 4,
      title: "Micro Form Builder",
      description: "Created a MERN stack tool for designing, customizing, and managing dynamic forms with real-time preview, data storage, and submission tracking.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB"],
      githubUrl: "https://github.com/amarasravya/micro-form-builder",
      period: "2024"
    }
  ],

  achievements: [
    "SQL(Basic) - HackerRank",
    "JavaScript - DevTown",
    "Frontend development - Content & Solutions",
    "Data structures and algorithms - DevTown",
    "Artificial Intelligence - Freelance with AI",
    "Graphs and Dynamic programming - Google developers Group On Campus VIT-AP",
    "Spoken Languages - DevTown",
    "Machine Learning - DevTown",
    "Learning - Career Explorer job simulation - Forage"
  ],

  honors: [
    "Secured 3rd place in the 'Hack with Science' Hackathon Recognized for innovative problem-solving and web development.",
    "Participated in Amazon Summer Machine Learning School, gaining hands-on experience in ML and world problem-solving.",
    "Built URL Shortener Web Application using MERN stack with link analytics and click tracking."
  ]
};

// Get all portfolio data
router.get('/', (req, res) => {
  try {
    res.json(portfolioData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio data' });
  }
});

// Get specific sections
router.get('/personal', (req, res) => {
  try {
    res.json(portfolioData.personal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching personal data' });
  }
});

router.get('/education', (req, res) => {
  try {
    res.json(portfolioData.education);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education data' });
  }
});

router.get('/experience', (req, res) => {
  try {
    res.json(portfolioData.experience);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience data' });
  }
});

router.get('/skills', (req, res) => {
  try {
    res.json(portfolioData.skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills data' });
  }
});

router.get('/projects', (req, res) => {
  try {
    res.json(portfolioData.projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects data' });
  }
});

router.get('/achievements', (req, res) => {
  try {
    res.json(portfolioData.achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements data' });
  }
});

router.get('/honors', (req, res) => {
  try {
    res.json(portfolioData.honors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching honors data' });
  }
});

module.exports = router;
