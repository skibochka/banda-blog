import { EntityTarget, getConnection, Repository } from 'typeorm';

function model<T>(entity: EntityTarget<T>): Repository<T> {
  return getConnection(process.env.CURRENT_CONNECTION_NAME).getRepository(entity);
}

export {
  model,
};
