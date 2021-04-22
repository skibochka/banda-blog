import supertestInstance from '../src/helpers/tests/supertestInstance';
import { unlinkSync } from 'fs';

let access: string;
let refresh: string;

describe('Authorization tests', () => {
  afterAll((done) => {
    unlinkSync('blog.db');
    done();
  });

  test('Sign-up test', async (done) => {
    const agent = await supertestInstance();
    agent
      .post('/auth/sign-up')
      .send({
        login: 'test',
        password: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('login');
        done();
      });
  });

  test('Sign-in test', async (done) => {
    const agent = await supertestInstance();
    agent
      .post('/auth/sign-in')
      .send({
        login: 'test',
        password: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        access = body.access;
        refresh = body.refresh;

        expect(body).toHaveProperty('access');
        expect(body).toHaveProperty('refresh');
        done();
      });
  });

  test('Sign-out test', async (done) => {
    const agent = await supertestInstance();
    agent
      .post('/auth/sign-out')
      .set('Authorization', `Bearer ${access}`)
      .send({
        access,
        refresh,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty('msg', 'Logged out');
        done();
      });
  });
});