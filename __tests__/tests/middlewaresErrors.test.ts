import supertestInstance from '../../src/helpers/tests/supertestInstance';
import supertest from 'supertest';
import { getDefaultAccessToken } from '../../src/helpers/tests/getAccessToken';

let agent: supertest.SuperTest<supertest.Test>;
let defaultAccessToken: string;
let testPostId: number;


describe('Middlewares errors', () => {
  beforeAll(async () => {
    agent = await supertestInstance();
    defaultAccessToken = await getDefaultAccessToken();
  });

  test('Validation error', (done) => {
    agent
      .post('/post/create')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        title: 666,
        content: 'validation error content',
      })
      .expect(500)
      .then(({ body }) => {
        expect(body)
          .toEqual({ error: { message: 'Validation Error!' } });
        done();
      });
  });

  test('No authorization header test', (done) => {
    agent
      .put('/post/create')
      .send({
        title: 'No auth header error',
        content: 'auth error',
      })
      .expect(500)
      .then(({ body }) => {
        expect(body)
          .toEqual({ error: { message: 'No authorization header' } });
        done();
      });
  });

  test('Expired token', (done) => {
    agent
      .post('/post/like')
      // eslint-disable-next-line max-len
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJza2liYSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MTczNDUwMjcsImV4cCI6MTYxNzM0ODAyN30.CHHmV2jSip4UuF4KU0OFbTdrNS2ayLIjI5lHZjMfqLA')
      .send({
        postId: testPostId,
      })
      .expect(500)
      .then(() => {
        done();
      });
  });
});
