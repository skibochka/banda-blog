import { model } from '../db/repository';
import { User } from '../../models/User';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Comment';
import State from './state';

export async function initDefaultUserDatabase() {
  const defaultUser = await model(User).save({
    login: 'test',
    password: 'test',
  });
  State.set('testDefaultUser', defaultUser.id);
}

export async function initAdminUserDatabase() {
  const defaultUser = await model(User).save({
    login: 'testAdminUser',
    password: 'test',
  });
  const adminUser = await model(User).save({
    login: 'testAdmin',
    password: 'test',
    isAdmin: true,
  });
  const testPost = await model(Post).save({
    title: 'admin test title',
    content: 'admin test',
    user: defaultUser,
  });
  const testComment = await model(Comment).save({
    content: 'test admin content',
    post: testPost,
    user: defaultUser,
  });

  State.set('testAdminUser', adminUser.id);
  State.set('testAdminPostId', testPost.id);
  State.set('testAdminCommentId', testComment.id);
}

export async function initUserErrorsDatabase() {
  const defaultUser = await model(User).save({
    login: 'testUserErrors',
    password: 'test',
  });
  const testPost = await model(Post).save({
    title: 'User error test',
    content: 'admin test',
    user: defaultUser,
  });
  const testComment = await model(Comment).save({
    content: 'User error test',
    post: testPost,
    user: defaultUser,
  });

  State.set('testUserErrorsPostId', testPost.id);
  State.set('testUserErrorsCommentId', testComment.id);
}

export async function initGettingPostsDataBase() {
  const defaultUser = await model(User).save({
    login: 'testGettingPosts',
    password: 'test',
  });
  const testPost = await model(Post).save({
    title: 'Getting posts test',
    content: 'get test',
    user: defaultUser,
  });
  await model(Post).save({
    title: 'Getting posts test',
    content: 'get test',
    user: defaultUser,
  });
  await model(Post).save({
    title: 'Getting posts test',
    content: 'get test',
    user: defaultUser,
  });
  await model(Comment).save({
    content: 'Getting comments test',
    post: testPost,
    user: defaultUser,
  });
  await model(Comment).save({
    content: 'Getting comments test',
    post: testPost,
    user: defaultUser,
  });
  State.set('gettingPostId', testPost.id);
}
