const axios = require('axios');

async function getWeatherData() {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Beijing&appid=YOUR_WEATHER_API_KEY');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
}

async function getAirQualityData() {
  try {
    const response = await axios.get('https://api.waqi.info/feed/beijing/?token=YOUR_AQI_API_KEY');
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching air quality data');
  }
}

module.exports = {
  getWeatherData,
  getAirQualityData
};
