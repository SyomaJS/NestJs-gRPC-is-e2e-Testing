import { User } from '../../globals/entities/user.entity';

const createUser = (overrides: Partial<User> = {}): User => {
  const user = new User();
  user.id = overrides.id || 1;
  user.login = overrides.login || 'defaultLogin';
  user.hashedPassword = overrides.hashedPassword || 'hashedPassword';
  user.isActive = overrides.isActive !== undefined ? overrides.isActive : true;
  return user;
};
