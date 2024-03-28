import { User } from '../../globals/entities/user.entity';

export const usersStub = (): Partial<User> => {
  return {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    hashedPassword: 'jfoiwjf8934jf8934jfqij.jf430fj024jf.4ljfoj423f',
    isActive: true,
  };
};

export const tokens = {
  accessToken: 'testAccessToken',
  refreshToken: 'testRefreshToken',
};
