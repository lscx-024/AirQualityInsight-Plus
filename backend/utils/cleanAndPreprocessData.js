function cleanAndPreprocessData(weatherData, airQualityData) {
  if (!weatherData.main || !airQualityData.aqi) {
    console.log('Invalid data received');
    return null;
  }

  // Convert temperature from Kelvin to Celsius
  weatherData.main.temp -= 273.15;

  return { weatherData, airQualityData };
}

module.exports = cleanAndPreprocessData;
