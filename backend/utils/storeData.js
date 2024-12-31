const influx = require('../config/dbConfig');

async function storeData(weatherData, airQualityData) {
  try {
    await influx.writePoints([
      {
        measurement: 'air_quality',
        tags: { city: 'Beijing' },
        fields: {
          temperature: weatherData.main.temp,
          humidity: weatherData.main.humidity,
          aqi: airQualityData.aqi
        }
      }
    ]);
  } catch (err) {
    console.error(`Error saving data to InfluxDB! ${err.stack}`);
  }
}

module.exports = storeData;
