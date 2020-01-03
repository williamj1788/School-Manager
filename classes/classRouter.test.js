const {assert} = require('chai');
const app = require('../server');
const supertest = require('supertest');
const mongoose = require('mongoose');

let agent;
let userID;

describe('classRouter', () => {
  afterEach(async () => {
    await mongoose.connection.model('user').deleteMany();
    await mongoose.connection.collection('sessions').deleteMany({});
  });


  beforeEach(async () => {
    const userForm = {
      email: 'email123@gmail.com', password: 'password1',
    };
    const passwordHash =
  '$2b$10$BIfKfrOhPW/.3U4bGnJ6/.lgWYkiH.3F8nToYiChXt/rDWlq47XgS';

    const {insertedId} = await mongoose.connection
        .collection('users')
        .insertOne({
          email: userForm.email,
          password: passwordHash,
        });

    userID = insertedId;

    agent = supertest.agent(app);
    await agent.post('/api/user/login').send(userForm);
  });

  describe('POST /', () => {
    it('should add class to database', async () => {
      const res = await agent.post('/api/class').send({
        _id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        name: 'mockName',
        teacher: 'mr.mockTeacher',
        color: '#fff',
      });
      assert.strictEqual(200, res.status);

      const user = await mongoose.connection.model('user').findById(userID);

      const classJson = user.classes
          .id('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed')
          .toJSON();

      assert.containsAllKeys(classJson, {
        _id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        name: 'mockName',
        teacher: 'mr.mockTeacher',
        color: '#fff',
        tasks: [],
        tests: [],
      }, `can\'t find class in user object or object
          does not have a correct shape`);
    });
  });
});
