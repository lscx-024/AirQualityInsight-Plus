const request = require('supertest');
const app = require('../server');

describe('GET /api/weather', () => {
  it('should respond with weather data', async () => {
    const res = await request(app)
      .get('/api/weather')
      .set('Authorization', 'Bearer your_valid_token_here');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('main');
  });
});

describe('GET /api/air-quality', () => {
  it('should respond with air quality data', async () => {
    const res = await request(app)
      .get('/api/air-quality')
      .set('Authorization', 'Bearer your_valid_token_here');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('aqi');
  });
});
