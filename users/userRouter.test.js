const {assert} = require('chai');
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');

afterEach(async () => {
  await mongoose.connection.model('user').remove();
  await mongoose.connection.model('class').remove();
  await mongoose.connection.model('task').remove();
  await mongoose.connection.model('test').remove();
  await mongoose.connection.collection('sessions').deleteMany({});
});
const res = mongoose.connection.collection('users').insertOne({email: 'email'});
res.then((doc) => {
  doc.insertedId;
});

const userForm = {
  email: 'email123@gmail.com', password: 'password1',
};

describe('userRouter', () => {
  describe('POST /signup', () => {
    it(
        `should return correct user data and 
        headers if user doesn\'t already exist`,
        async () => {
          const res = await request.post('/api/user/signup').send(userForm);
          assert.strictEqual(res.status, 201, 'wrong status code');
          assert.containsAllKeys(res.header, ['set-cookie']);
          assert.containsAllKeys(res.body, ['email', 'classes']);
          assert.strictEqual(res.body.email, 'email123@gmail.com');
          assert.isArray(res.body.classes);
          assert.doesNotHaveAnyKeys(res.body, ['password', '_id']);
        });
    it('should get correct status code and no body when failed', async () => {
      await mongoose.connection.collection('users')
          .insertOne({email: 'email123@gmail.com'});

      const res = await request.post('/api/user/signup').send(userForm);
      assert.strictEqual(res.status, 409, 'wrong status code');
      assert.doesNotHaveAnyKeys(res.header, ['set-cookie']);
    });
  });

  describe('POST /login', () => {
    it('should retrieve user with given credentials if user exits',
        async () => {
          await mongoose.connection.collection('users')
              .insertOne({email: 'email123@gmail.com', password: 'password1'});

          const res = await request.post('/api/user/login').send(userForm);

          assert.strictEqual(res.status, 200, 'wrong status code');
          assert.containsAllKeys(res.header, ['set-cookie']);
          assert.containsAllKeys(res.body, ['email', 'classes']);
          assert.strictEqual(res.body.email, 'email123@gmail.com');
          assert.isArray(res.body.classes);
          assert.doesNotHaveAnyKeys(res.body, ['password', '_id']);
        });

    it('should return error if user doesn\'t exits', async () => {
      const res = await request.post('/api/user/login').send(userForm);

      assert.strictEqual(res.status, 404, 'wrong status code');
      assert.doesNotHaveAnyKeys(res.header, ['set-cookie']);
    });
  });

  describe('POST /signout', () => {
    /**
     * no real way to test if session was deleted from store
     * just have to check to see if the response is ok
     */
    it('should clear session id cookie', async () => {
      const res = await request.post('/api/user/signout');
      assert.strictEqual(res.status, 200, 'wrong status code');
      assert.isEmpty(res.body);
    });
  });

  describe('GET /', () => {
    it('should return user data if session is found', async () => {
      await mongoose.connection.collection('users').insertOne(userForm);
      const agent = supertest.agent(app);
      await agent.post('/api/user/login').send(userForm);
      const res = await agent.get('/api/user');

      assert.strictEqual(res.status, 200, 'wrong status code');
      assert.containsAllKeys(res.body, ['email', 'classes']);
      assert.strictEqual(res.body.email, userForm.email);
      assert.isArray(res.body.classes);
      assert.doesNotHaveAnyKeys(res.body, ['password', '_id']);
    });
    it('should not return user data if session is not found', async () => {
      const res = await request.get('/api/user');
      assert.strictEqual(res.status, 401, 'wrong status code');
    });
  });
});
