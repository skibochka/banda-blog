import supertestInstance from '../../src/helpers/tests/supertestInstance';
import supertest from 'supertest';
import { getDefaultAccessToken } from '../../src/helpers/tests/getAccessToken';
import { initDefaultUserDatabase } from '../../src/helpers/tests/initDatabase';

let agent: supertest.SuperTest<supertest.Test>;
let defaultAccessToken: string;
let testPostId: number;
let testCommentId: number;


describe('Default user blog functionality tests', () => {
  beforeAll(async () => {
    agent = await supertestInstance();
    await initDefaultUserDatabase();
    defaultAccessToken = await getDefaultAccessToken();
  });

  test('Create post test', (done) => {
    agent
      .post('/post/create')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        title: 'test title',
        content: 'test content',
      })
      .expect(500)
      .then(({ body }) => {
        console.log(body);
        testPostId = body.id;
        expect(body)
          .toHaveProperty('id');
        expect(body)
          .toHaveProperty('title');
        expect(body)
          .toHaveProperty('content');
        done();
      });
  });

  test('Update post test', (done) => {
    agent
      .put('/post/update')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        postId: testPostId,
        update: {
          title: 'test',
          content: 'test update',
        },
      })
      .expect(500)
      .then(({ body }) => {
        console.log(body);
        expect(body)
          .toHaveProperty('msg', 'Successful updated');
        done();
      });
  });

  test('Like post test', (done) => {
    agent
      .post('/post/like')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        postId: testPostId,
      })
      .expect(500)
      .then(({ body }) => {
        console.log(body);
        expect(body)
          .toHaveProperty('msg', 'Successful liked');
        done();
      });
  });

  test('Post comment test', (done) => {
    agent
      .post('/post/comment')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        postId: testPostId,
        content: 'test comment',
      })
      .expect(500)
      .then(({ body }) => {
        console.log(body);
        testCommentId = body.id;
        expect(body)
          .toHaveProperty('content');
        done();
      });
  });

  test('Comment update test', (done) => {
    agent
      .put('/post/comment/update')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        commentId: testPostId,
        update: {
          content: 'Updated test',
        },
      })
      .expect(500)
      .then(({ body }) => {
        console.log(body);
        expect(body)
          .toHaveProperty('msg', 'Successful updated');
        done();
      });
  });

  test('Comment like test', (done) => {
    agent
      .post('/post/comment/like')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        commentId: testPostId,
      })
      .expect(500)
      .then(({ body }) => {
        console.log(body);
        expect(body)
          .toHaveProperty('msg', 'Successful liked');
        done();
      });
  });

  test('Comment delete test', (done) => {
    agent
      .delete('/post/comment/delete')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        commentId: testCommentId,
      })
      .expect(500)
      .then(({ body }) => {
        console.log(body);
        expect(body)
          .toHaveProperty('msg', 'Comment successful deleted');
        done();
      });
  });

  test('Post delete test', (done) => {
    agent
      .delete('/post/delete')
      .set('Authorization', `Bearer ${defaultAccessToken}`)
      .send({
        postId: testPostId,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body)
          .toHaveProperty('msg', 'Post successful deleted');
        done();
      });
  });
});
