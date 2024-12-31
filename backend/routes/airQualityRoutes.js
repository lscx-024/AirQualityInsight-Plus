const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { getAirQualityData } = require('../utils/fetchData');

router.get('/air-quality', authenticateToken, async (req, res) => {
  try {
    const airQualityData = await getAirQualityData();
    res.json(airQualityData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch air quality data' });
  }
});

module.exports = router;
