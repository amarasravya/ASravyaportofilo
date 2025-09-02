import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Amara Sravya. All rights reserved.</p>
      <div>
        <a href="https://www.linkedin.com/in/amara-sravya" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/amarasravya" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;