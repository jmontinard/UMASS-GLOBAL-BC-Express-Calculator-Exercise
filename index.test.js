const request = require('supertest');
const app = require('./app');  // Replace with path to your Express app

// npm i --global jest install jest

describe('mean', () => {
  test('calculates mean of valid numbers', async () => {
    const response = await request(app).get('/mean?nums=1,2,3');
    expect(response.body).toEqual({ operation: 'mean', value: 2 });
  });

  test('returns error for invalid numbers', async () => {
    const response = await request(app).get('/mean?nums=foo,2,3');
    expect(response.status).toBe(400);
    expect(response.text).toBe('foo is not a number');
  });

  test('returns error for missing nums', async () => {
    const response = await request(app).get('/mean');
    expect(response.status).toBe(400);
    expect(response.text).toBe('nums are required');
  });
});


describe('median', () => {
  test('calculates median of valid numbers', async () => {
    const response = await request(app).get('/median?nums=1,2,3');
    expect(response.body).toEqual({ operation: 'median', value: 3 });
  });

  test('returns error for invalid numbers', async () => {
    const response = await request(app).get('/median?nums=foo,2,3');
    expect(response.status).toBe(400);
    expect(response.text).toBe('foo is not a number');
  });

  test('returns error for missing nums', async () => {
    const response = await request(app).get('/median');
    expect(response.status).toBe(400);
    expect(response.text).toBe('nums are required');
  });
});


describe('mode', () => {
  test('calculates median of valid numbers', async () => {
    const response = await request(app).get('/mode?nums=1,2,3,3');
    expect(response.body).toEqual({ operation: 'mode', value: 3 });
  });

  test('returns error for invalid numbers', async () => {
    const response = await request(app).get('/mode?nums=foo,2,3');
    expect(response.status).toBe(400);
    expect(response.text).toBe('foo is not a number');
  });

  test('returns error for missing nums', async () => {
    const response = await request(app).get('/mode');
    expect(response.status).toBe(400);
    expect(response.text).toBe('nums are required');
  });
});