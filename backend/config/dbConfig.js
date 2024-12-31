const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'air_quality_db',
  schema: [
    {
      measurement: 'air_quality',
      fields: {
        temperature: Influx.FieldType.FLOAT,
        humidity: Influx.FieldType.FLOAT,
        aqi: Influx.FieldType.INTEGER
      },
      tags: [
        'city'
      ]
    }
  ]
});

module.exports = influx;
