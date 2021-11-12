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
});

describe('[POST] /auth/register', () => {
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
    test('/register responds correct welcome message', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "foobiscuit", password: "foo12" })
      expect(res.status).toBe(201)
      expect(res.body).toMatchObject({ message: "Welcome, foobiscuit~" })
    })  
  });
});

describe('[POST] /auth/login', () => {
  test('/login responds with correct errors', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: "notYou", password: "denied1"})
    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({ name: "yo" })
  })

})