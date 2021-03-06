import supertestInstance from '../../src/helpers/tests/supertestInstance';
import supertest from 'supertest';
import { initGettingPostsDataBase } from '../../src/helpers/tests/initDatabase';
import CacheStorage from '../../src/helpers/db/cacheStorage';

let agent: supertest.SuperTest<supertest.Test>;
let testPostId: string;


describe('Check getting posts and comments', () => {
  beforeAll(async () => {
    agent = await supertestInstance();
    await initGettingPostsDataBase();
    const cacheStorage = await CacheStorage;
    testPostId = await cacheStorage.get('gettingPostId') as string;
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
      .then(({ body }) => {
        expect(body).toEqual(expect.any(Array));
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
      .then(({ body }) => {
        expect(body).toEqual(expect.any(Object));
        done();
      });
  });

  test('Check getting cached post by id', (done) => {
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
