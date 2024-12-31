const request = require('supertest');
const app = require('../server');

describe('Integration Tests', () => {
  it('should fetch and process data correctly', async () => {
    const weatherRes = await request(app)
      .get('/api/weather')
      .set('Authorization', 'Bearer your_valid_token_here');
    expect(weatherRes.statusCode).toEqual(200);
    expect(weatherRes.body).toHaveProperty('main');

    const airQualityRes = await request(app)
      .get('/api/air-quality')
      .set('Authorization', 'Bearer your_valid_token_here');
    expect(airQualityRes.statusCode).toEqual(200);
    expect(airQualityRes.body).toHaveProperty('aqi');
  });
});
