import supertestInstance from '../../src/helpers/tests/supertestInstance';
import supertest from 'supertest';
import { getAdminAccessToken } from '../../src/helpers/tests/getAccessToken';
import { initAdminUserDatabase } from '../../src/helpers/tests/initDatabase';
import redisConnection from '../../src/redis/redisConnection';

const redis = redisConnection();
let agent: supertest.SuperTest<supertest.Test>;
let adminAccessToken: string;
let postId: string;
let commentId: string;

describe('Admin user blog functionality test', () => {
  beforeAll(async () => {
    agent = await supertestInstance();
    await initAdminUserDatabase();
    adminAccessToken = await getAdminAccessToken();
    postId = await redis.get('testAdminPostId') as string;
    commentId = await redis.get('testAdminCommentId') as string;
  });

  test('Admin update default user`s post', (done) => {
    agent
      .put('/post/update')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({
        postId: +postId,
        update: {
          title: 'Admin update',
          content: 'Admin update test pass',
        },
      })
      .expect(200)
      .then(({ body }) => {
        expect(body)
          .toHaveProperty('msg', 'Successful updated');
        done();
      });
  });

  test('Admin update default user`s comment', (done) => {
    agent
      .put('/post/comment/update')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({
        commentId: +commentId,
        update: {
          content: 'Admin update test',
        },
      })
      .expect(200)
      .then(({ body }) => {
        expect(body)
          .toHaveProperty('msg', 'Successful updated');
        done();
      });
  });

  test('Admin delete default user`s comment', (done) => {
    agent
      .delete('/post/comment/delete')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({
        commentId: +commentId,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body)
          .toHaveProperty('msg', 'Comment successful deleted');
        done();
      });
  });

  test('Admin delete default users`s post', (done) => {
    agent
      .delete('/post/delete')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({
        postId: +postId,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body)
          .toHaveProperty('msg', 'Post successful deleted');
        done();
      });
  });
});
