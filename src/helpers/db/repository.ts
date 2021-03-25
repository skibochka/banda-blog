import { EntityTarget, getConnection, Repository } from 'typeorm';

function model<T>(entity: T): Repository<T> {
  return getConnection().getRepository(entity as any as EntityTarget<T>);
}

export {
  model,
};
