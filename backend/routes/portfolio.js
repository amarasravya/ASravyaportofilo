const express = require('express');
const router = express.Router();
const data = require('../data/portfolioData');

// Get all portfolio data
router.get('/', (req, res) => {
  try {
    if (!data) {
      return res.status(404).json({ message: 'Portfolio data not found.' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ message: 'Server error fetching portfolio data' });
  }
});

// Get specific sections
// This is a DRY (Don't Repeat Yourself) approach to creating section-specific routes.
const getSection = (section) => (req, res) => {
  try {
    if (data && data[section]) {
      res.json(data[section]);
    } else {
      res.status(404).json({ message: `Section '${section}' not found.` });
    }
  } catch (error) {
    console.error(`Error fetching section ${section}:`, error);
    res.status(500).json({ message: `Server error fetching ${section} data` });
  }
};

router.get('/personal', getSection('personal'));
router.get('/education', getSection('education'));
router.get('/experience', getSection('experience'));
router.get('/skills', (req, res) => {
  try {
    const skills = data.skills || {};
    const frameworksCombined = [
      ...(skills.frameworksLibraries || []),
      ...(skills.frontend || [])
    ];
    const toolsCombined = [
      ...(skills.toolsPlatforms || [])
    ];

    res.json({
      programmingLanguages: skills.programmingLanguages || [],
      frameworks: frameworksCombined,
      databases: skills.databases || [],
      tools: toolsCombined
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Server error fetching skills data' });
  }
});
router.get('/projects', getSection('projects'));
router.get('/achievements', getSection('achievements'));
router.get('/honors', getSection('honors'));

module.exports = router;
