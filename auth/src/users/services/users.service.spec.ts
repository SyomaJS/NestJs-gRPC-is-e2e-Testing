import {
  CreateUserRequest,
  LoginUserRequest,
  LogoutUserRequest,
  UpdateUserRequest,
} from '../../../globals/interfaces/auth';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { RedisService } from '../../redis/redis.service';
import { mockRedisService } from '../../../test/__mocks__/redis.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../globals/entities/user.entity';
import { usersStub } from '../../../test/stubs/users.stub';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { MockedFunction } from 'jest-mock';

describe('UsersService', () => {
  let app: TestingModule;
  let usersService: UsersService;
  let mockCompare: any;

  const mockUsersRepository = {
    create: jest
      .fn()
      .mockImplementation((createUserRequest: CreateUserRequest) => {
        return createUserRequest;
      }),

    save: jest.fn().mockImplementation((user: User) => {
      return user;
    }),

    findOneBy: jest.fn().mockImplementation((conditions: any) => {
      if (conditions.login === usersStub().login) {
        return Promise.resolve(usersStub());
      } else if (conditions.id === usersStub().id) {
        return Promise.resolve(usersStub());
      }

      return Promise.resolve(null);
    }),

    findOne: jest.fn().mockImplementation((options: any) => {
      if (options.where.id == usersStub().id) {
        return Promise.resolve(usersStub());
      }

      return Promise.resolve(null);
    }),

    find: jest.fn().mockResolvedValue([usersStub()]),

    remove: jest.fn().mockImplementation((user: User) => {
      return Promise.resolve(user);
    }),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('token'),
    decode: jest.fn().mockResolvedValue({ id: usersStub().id }),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = app.get<UsersService>(UsersService);

    mockCompare = jest.spyOn(bcrypt, 'compare') as MockedFunction<
      typeof bcrypt.compare
    >;
  });

  it('Services should be defined', () => {
    expect(usersService).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
    usersService = null;
  });

  describe('"findAll" method', () => {
    it('should return all users', async () => {
      const users = [usersStub()];

      const result = await usersService.findAll();

      expect(result).toEqual({ users });
    });
  });

  describe('"findOne" method', () => {
    it('should return user by id', () => {
      const userId = usersStub().id;

      expect(usersService.findOne(userId)).resolves.toEqual(usersStub());
    });
  });

  describe('"signup" method', () => {
    it('should create new user', async () => {
      const createUserRequest: CreateUserRequest = {
        login: 'newuser',
        password: 'password',
        firstName: 'New',
        lastName: 'User',
      };

      const newUser = await usersService.signup(createUserRequest);

      expect(newUser).toMatchObject(createUserRequest);
    });

    it('should throw an error if login already in use', async () => {
      const createUserRequest: CreateUserRequest = {
        login: usersStub().login,
        password: 'password',
        firstName: 'Existing',
        lastName: 'User',
      };

      await expect(usersService.signup(createUserRequest)).rejects.toThrow(
        RpcException,
      );
    });
  });

  describe('"logout" method', () => {
    it('should logout user', async () => {
      const logoutUserRequest: LogoutUserRequest = {
        refreshToken: 'dummyRefreshToken',
      };

      jest
        .spyOn(mockJwtService, 'decode')
        .mockReturnValue({ id: usersStub().id });

      const result = await usersService.logout(logoutUserRequest);

      expect(result).toEqual(usersStub());
    });

    it('should throw an error if token is invalid', async () => {
      const logoutUserRequest: LogoutUserRequest = {
        refreshToken: 'invalidToken',
      };
      jest.spyOn(mockJwtService, 'decode').mockImplementation(() => ({
        decode: jest.fn().mockReturnValue(null),
      }));
      await expect(usersService.logout(logoutUserRequest)).rejects.toThrow(
        RpcException,
      );
    });
  });

  describe('"login" method', () => {
    it('should login user', async () => {
      const loginUserRequest: LoginUserRequest = {
        login: usersStub().login,
        password: 'correctPassword',
      };

      mockCompare.mockResolvedValue(true);
      const result = await usersService.login(loginUserRequest);
      expect(result.user).toEqual(usersStub());
      expect(result.tokens).toBeDefined();
    });

    it('should throw an error if password is incorrect', async () => {
      const loginUserRequest: LoginUserRequest = {
        login: usersStub().login,
        password: 'incorrectPassword',
      };

      mockCompare.mockResolvedValue(false);
      await expect(usersService.login(loginUserRequest)).rejects.toThrow(
        RpcException,
      );
    });
  });

  describe('"remove" method', () => {
    it('should remove user', async () => {
      const removedUser = await usersService.remove(usersStub().id);

      expect(removedUser).toEqual(usersStub());
    });
  });
});
