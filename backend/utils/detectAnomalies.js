function detectAnomalies(airQualityData) {
  const aqiThreshold = 100;
  if (airQualityData.aqi > aqiThreshold) {
    triggerAlert(`High AQI detected: ${airQualityData.aqi}`);
  }
}

function triggerAlert(message) {
  console.log('Alert:', message);
  logAlert(message);
}

function logAlert(message) {
  console.log('Logged Alert:', message);
}

module.exports = {
  detectAnomalies
};
