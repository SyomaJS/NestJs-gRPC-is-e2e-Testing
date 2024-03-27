import { Repository } from 'typeorm';
import { User } from '../../../globals/entities/user.entity';
import { CreateUserRequest } from '../../../globals/interfaces/auth';

const createUser = (overrides: Partial<User> = {}): User => {
  const user = new User();
  user.id = overrides.id || 1;
  user.login = overrides.login || 'defaultLogin';
  user.hashedPassword = overrides.hashedPassword || 'hashedPassword';
  user.isActive = overrides.isActive !== undefined ? overrides.isActive : true;
  return user;
};

export const mockUsersRepository: jest.Mocked<Repository<User>> = {
  create: jest.fn((createUserRequest: CreateUserRequest) => createUser(createUserRequest)),
  save: jest.fn((user: User) => Promise.resolve(user)),
  findOneBy: jest.fn((conditions: any) => {
    if (conditions.login === 'existingUser') {
      return Promise.resolve(createUser({ login: conditions.login }));
    }
    return Promise.resolve(undefined);
  }),
  find: jest.fn(() => Promise.resolve([createUser()])),
  remove: jest.fn((user: User | User[]) => {
    if (Array.isArray(user)) {
      return Promise.resolve(user);
    }
    return Promise.resolve(user);
  }),
  merge: jest.fn((user: User, updateUserDto: any) => createUser({ ...user, ...updateUserDto })),
};
