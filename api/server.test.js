const server = require('./server');
const db = require('../data/dbConfig');
const request = require('supertest');

beforeAll( async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
});

beforeEach( async () => {
  // await db.seed.run()
});

afterAll( async () => {
  await db.destroy()
});

test('sanity', () => {
  expect(true).toBe(true)
});

describe('[POST] /auth/auth-router', () => {
  describe('error checks', () => {
    test('/register responds with correct errors', async () => {
      const res = await request(server).post('/api/auth/register')
      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({ message: "username and password required" })
    })

    test('/register responds with errors for missing fields', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "", password: "" })
      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({ message: "username and password required" })
    })  
  });

  describe('registration succeeds', () => {
    test('/register responds correct welcome message upon successful registration', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "foobiscuit", password: "foo12" })
      expect(res.status).toBe(201)
      expect(res.body).toMatchObject({ message: "Welcome, foobiscuit~" })
    })  
  });

});
