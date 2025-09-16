// Alaa Ahmad

const request = require('supertest');
const app = require('./app');

describe('GET /health endpoint', () => {

  test('should return status 200 and a specific JSON body', async () => {
    // Use supertest to make a request to my Express app.
    const response = await request(app).get('/health');
    
    // Assert the HTTP status code.
    expect(response.statusCode).toBe(200);

    // Assert the response body. `toEqual` is used for object comparison.
    expect(response.body).toEqual({ ok: true, student: 'Alaa Ahmad' });
  });

});