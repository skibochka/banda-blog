import supertestInstance from '../../src/helpers/tests/supertestInstance';
import supertest from 'supertest';
import { getDefaultAccessToken } from '../../src/helpers/tests/getAccessToken';
import { initUserErrorsDatabase } from '../../src/helpers/tests/initDatabase';
import State from '../../src/helpers/tests/state';

let agent: supertest.SuperTest<supertest.Test>;
let defaultAccessToken: string;
let postId: string;
let commentId: string;

describe('Check default user expected errors', () => {
  beforeAll(async () => {
    agent = await supertestInstance();
    await initUserErrorsDatabase();
    defaultAccessToken = await getDefaultAccessToken();
    postId = State.get('testUserErrorsPostId') as string;
    commentId = State.get('testUserErrorsCommentId') as string;
  });

  test('Check for error while trying to update another user`s post', (done) => {
    agent
      .put('/post/update')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        postId: +postId,
        update: {
          title: 'invalid update',
          content: 'Invalid test content',
        },
      })
      .expect(500)
      .then(({ body }) => {
        expect(body)
          .toEqual({ error: { message: 'You can`t update posts of other users' } });
        done();
      });
  });

  test('Check for error while trying to update another user`s comment', (done) => {
    agent
      .put('/post/comment/update')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        commentId: +commentId,
        update: {
          content: 'Invalid update test',
        },
      })
      .expect(500)
      .then(({ body }) => {
        expect(body)
          .toEqual({ error: { message: 'You can`t update comments of other users' } });
        done();
      });
  });

  test('Check for error while trying to delete another user`s comment', (done) => {
    agent
      .delete('/post/comment/delete')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        commentId: +commentId,
      })
      .expect(500)
      .then(({ body }) => {
        expect(body)
          .toEqual({ error: { message: 'You can`t delete comments of other users' } });
        done();
      });
  });

  test('Check for error while trying to delete another user`s post', (done) => {
    agent
      .delete('/post/delete')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        postId: +postId,
      })
      .expect(500)
      .then(({ body }) => {
        expect(body)
          .toEqual({ error: { message: 'You can`t delete posts of other users' } });
        done();
      });
  });
});
