import supertestInstance from '../../src/helpers/tests/supertestInstance';
import supertest from 'supertest';
import { initGettingPostsDataBase } from '../../src/helpers/tests/initDatabase';
import redisConnection from '../../src/redis/redisConnection';

const redis = redisConnection();
let agent: supertest.SuperTest<supertest.Test>;
let testPostId: string;


describe('Check getting posts and comments', () => {
  beforeAll(async () => {
    agent = await supertestInstance();
    await initGettingPostsDataBase();
    testPostId = await redis.get('gettingPostId') as string;
  });

  test('Check getting post by pagination', () => {
    agent
      .get('/post')
      .query({
        skip: 3,
        take: 3,
        page: 0,
      })
      .expect(200);
  });

  test('Check getting post by id', () => {
    agent
      .get('/post/get')
      .query({
        postId: +testPostId,
      })
      .expect(200);
  });

  test('Get comments by post id', () => {
    agent
      .get('/post/comments')
      .query({
        postId: +testPostId,
      })
      .expect(200);
  });
});
