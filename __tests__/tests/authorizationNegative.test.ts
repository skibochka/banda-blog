import supertestInstance from '../../src/helpers/tests/supertestInstance';
import supertest from 'supertest';

let agent: supertest.SuperTest<supertest.Test>;

describe('Authorization  negative tests', () => {
  beforeAll(async () => {
    agent = await supertestInstance();
  });

  test('Sign-up negative test', (done) => {
    agent
      .post('/auth/sign-up')
      .send({
        login: 'authorizationTest',
        password: 'test',
      })
      .expect(500)
      .then(({ body }) => {
        expect(body)
          .toEqual({ error: { message: 'Sorry such user is already exist' } });
        done();
      });
  });

  test('Sign-in negative test (non-existent user)', (done) => {
    agent
      .post('/auth/sign-in')
      .send({
        login: 'nonExistUserTest',
        password: 'test',
      })
      .expect(500)
      .then(({ body }) => {
        expect(body)
          .toEqual({ error: { message: 'Sorry such user does not exist' } });
        done();
      });
  });

  test('Sign-in negative test (wrong password)', (done) => {
    agent
      .post('/auth/sign-in')
      .send({
        login: 'authorizationTest',
        password: 'wrongPassword',
      })
      .expect(500)
      .then(({ body }) => {
        expect(body)
          .toEqual({ error: { message: 'Wrong password!' } });
        done();
      });
  });
});
