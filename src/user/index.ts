import { Db } from 'mongodb';
import { buildQuery, SearchBuilder } from 'mongodb-extension';
import { Log, Manager, Search } from 'onecore';
import { User, UserFilter, userModel, UserRepository, UserService } from './user';
import { UserController } from './user-controller';
export * from './user';
export { UserController };

import { MongoUserRepository } from './mongo-user-repository';

export class UserManager extends Manager<User, string, UserFilter> implements UserService {
  constructor(search: Search<User, UserFilter>, repository: UserRepository) {
    super(search, repository);
  }
}
export function useUserService(db: Db): UserService {
  const builder = new SearchBuilder<User, UserFilter>(db, 'users', buildQuery, userModel);
  const repository = new MongoUserRepository(db);
  return new UserManager(builder.search, repository);
}
export function useUserController(log: Log, db: Db): UserController {
  return new UserController(log, useUserService(db));
}
