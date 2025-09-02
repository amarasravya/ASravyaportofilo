const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Rate limiting for contact form - more restrictive
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per windowMs
  message: {
    error: 'Too many contact form submissions, please try again later.'
  }
});

// Apply rate limiting only to form submissions (POST)
// Note: do not rate limit GET /info to avoid blocking read-only requests

// Validation middleware
const validateContactForm = (req, res, next) => {
  const name = (req.body.name || '').trim();
  const email = (req.body.email || '').trim();
  const subject = (req.body.subject || '').trim();
  const message = (req.body.message || '').trim();

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: 'All fields are required: name, email, subject, message'
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Please provide a valid email address'
    });
  }

  // Length validation (post-trim)
  if (name.length > 100 || subject.length > 200 || message.length > 1000) {
    return res.status(400).json({
      error: 'Input length exceeds maximum allowed'
    });
  }

  // Attach sanitized values for downstream usage
  req.body.name = name;
  req.body.email = email;
  req.body.subject = subject;
  req.body.message = message;

  next();
};

// Configure nodemailer (you'll need to set up environment variables)
const createTransporter = () => {
  // For development, you can use a service like Gmail
  // For production, use a proper email service like SendGrid, Mailgun, etc.
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // Your app password
    }
  });
};

// POST /api/contact - Handle contact form submission
router.post('/', contactLimiter, validateContactForm, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Create transporter
    const transporter = createTransporter();
    
    // Email content
    const mailOptions = {
      from: `${name} <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <div style="background-color: white; padding: 15px; border-radius: 3px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `
    };
    
    // Send email with robust dev fallback
    let sent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail(mailOptions);
        sent = true;
      } catch (err) {
        console.error('Email send failed:', err);
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Dev fallback: logging message and returning success.');
          console.log(mailOptions.text);
          sent = true;
        } else {
          return res.status(502).json({
            error: 'Email service temporarily unavailable. Please try again later.'
          });
        }
      }
    } else {
      // For development - just log the message
      console.log('Contact form submission (email not configured):');
      console.log(mailOptions.text);
      sent = true;
    }

    if (sent) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
    }
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Failed to send message. Please try again later.'
    });
  }
});

// GET /api/contact/info - Get contact information
router.get('/info', (req, res) => {
  try {
    const contactInfo = {
      email: 'amarasravya65@gmail.com',
      phone: '+91 7995340740',
      location: 'Nellore, Andhra Pradesh, India',
      linkedin: 'https://www.linkedin.com/in/amara-sravya',
      github: 'https://github.com/amarasravya',
      availability: 'Available for freelance projects and full-time opportunities'
    };
    
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contact information' });
  }
});

module.exports = router;
