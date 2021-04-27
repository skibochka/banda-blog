import supertestInstance from '../../src/helpers/tests/supertestInstance';
import supertest from 'supertest';
import { initGettingPostsDataBase } from '../../src/helpers/tests/initDatabase';
import State from '../../src/helpers/tests/state';

let agent: supertest.SuperTest<supertest.Test>;
let testPostId: string;


describe('Check getting posts and comments', () => {
  beforeAll(async () => {
    agent = await supertestInstance();
    await initGettingPostsDataBase();
    testPostId = State.get('gettingPostId') as string;
  });

  test('Check getting post by pagination', (done) => {
    agent
      .get('/post')
      .query({
        skip: 3,
        take: 3,
        page: 0,
      })
      .expect(200)
      .then(() => {
        done();
      });
  });

  test('Check getting post by id', (done) => {
    agent
      .get('/post/get')
      .query({
        postId: +testPostId,
      })
      .expect(200)
      .then(() => {
        done();
      });
  });

  test('Get comments by post id', (done) => {
    agent
      .get('/post/comments')
      .query({
        postId: +testPostId,
      })
      .expect(200)
      .then(() => {
        done();
      });
  });
});
