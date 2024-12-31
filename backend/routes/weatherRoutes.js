const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { getWeatherData } = require('../utils/fetchData');

router.get('/weather', authenticateToken, async (req, res) => {
  try {
    const weatherData = await getWeatherData();
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
