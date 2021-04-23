import { model } from '../db/repository';
import { User } from '../../models/User';

export default async function initDatabase() {
  await model(User).save({
    login: 'test',
    password: 'test',
  });
  await model(User).save({
    login: 'testAdmin',
    password: 'test',
    isAdmin: true,
  });
}
