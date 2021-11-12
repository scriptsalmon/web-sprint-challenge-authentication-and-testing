const server = require('./server');
const db = require('../data/dbConfig');
const request = require('supertest');

beforeAll( async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
});

beforeEach( async () => {
  await db.seed.run()
});

afterAll( async () => {
  await db.destroy()
});

test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /auth/auth-router', () => {
  test('/register responds with correct errors', async () => {
    const res = await request(server).post('/api/auth')
    expect(res.status).toBe(200);
  })
})
