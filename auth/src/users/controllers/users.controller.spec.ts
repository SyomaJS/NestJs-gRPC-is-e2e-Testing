import {
  FindOneUserRequest,
  UpdateUserRequest,
} from '../../../globals/interfaces/auth';
import { usersStub } from '../../../test/stubs/users.stub';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../globals/entities/user.entity';
import { User as IUser } from '../../../globals/interfaces/auth';

import {
  CreateUserRequest,
  LoginResponse,
  LoginUserRequest,
  LogoutUserRequest,
} from '../../../globals/interfaces/auth';
import { mockUsersService } from '../../../test/__mocks__/users.service';

describe('UsersController', () => {
  let testingModule: TestingModule;
  let usersService: UsersService;
  let usersController: UsersController;

  //?  setup the testing module
  beforeAll(async () => {

    testingModule = await Test.createTestingModule({
      controllers: [UsersController],

      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        JwtService,
      ],
    }).compile();

    usersService = testingModule.get<UsersService>(UsersService);
    usersController = testingModule.get<UsersController>(UsersController);

  });

  //?  clean all mocks
  afterAll(async () => {

    await testingModule.close();
    usersService = null;
    usersController = null;

  });


  //? check if service & controllers defined
  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersController).toBeDefined();
  });

  //?  signup user
  describe('"signup" method', () => {

    let user: User;
    let createUserRequest: CreateUserRequest;

    beforeAll(async () => {
      createUserRequest = {
        firstName: usersStub().firstName,
        lastName: usersStub().lastName,
        login: usersStub().login,
        password: usersStub().hashedPassword,
      };

      user = await usersController.signup(createUserRequest);
    });

    it('should call signup method with correct parameters', () => {
      expect(usersService.signup).toHaveBeenCalledWith(createUserRequest);
    });

    it('should return an object of user', () => {
      expect(user).toEqual(usersStub());
    });
  });

  //?  signin user
  describe('"login" method', () => {

    let loginResponse: LoginResponse;
    let loginUserRequest: LoginUserRequest;

    beforeAll(async () => {
      loginUserRequest = {
        login: usersStub().login,
        password: usersStub().hashedPassword,
      };

      loginResponse = await usersController.login(loginUserRequest);
    });

    it('should call login method with correct parameters', () => {
      expect(usersService.login).toHaveBeenCalledWith(loginUserRequest);
    });

    it('should return a login response object', () => {
      expect(loginResponse).toEqual({
        user: usersStub(),
        tokens: {
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        },
      });
    });
  });

  //?  signout user
  describe('"logout" method', () => {
    let logoutUserRequest: LogoutUserRequest;
    let user: User;

    beforeAll(async () => {
      logoutUserRequest = {
        refreshToken: 'any-string',
      };

      user = await usersController.logout(logoutUserRequest);
    });

    it('should call logout method with correct parametrs', () => {
      expect(usersService.logout).toHaveBeenCalledWith(logoutUserRequest);
    });

    it('should return a object of user', () => {
      expect(user).toEqual(usersStub());
    });
  });


  describe('"findAll" method', () => {
    // let users: IUser[];
    let users: any;

    beforeAll(async () => {
      users = await usersController.findAll();
    });

    it('should call find all', () => {
      expect(usersService.findAll).toHaveBeenCalled();
    });

    it('should return all users as Array', () => {
      expect(users).toEqual([usersStub()]);
    });
    
  });

  describe('"findOne" method', () => {
    let user: User;
    let findOneUserRequest: FindOneUserRequest;

    beforeAll(async () => {
      findOneUserRequest = {
        id: usersStub().id,
      };

      user = await usersController.findOne(findOneUserRequest);
    });

    it('should call witn proper parametrs', () => {
      expect(usersService.findOne).toHaveBeenCalledWith(findOneUserRequest.id);
    });

    it('should return object of single user', () => {
      expect(user).toEqual(usersStub());
    });
  });

  describe('"updateUser" method', () => {
    let user: User;
    let updateUserRequest: Pick<UpdateUserRequest, 'id' | 'firstName'>;

    beforeAll(async () => {
      updateUserRequest = {
        id: usersStub().id,
        firstName: usersStub().firstName + 'updated',
      };

      user = await usersController.update(updateUserRequest);
    });

    it('should call with proper parametrs and return object of user', () => {
      expect(usersService.update).toHaveBeenCalledWith(
        updateUserRequest.id,
        updateUserRequest,
      );
      expect(user).toEqual(usersStub());
    });
  });

  describe('"removeUser" method', () => {
    let user: User;
    let findOneUserRequest: FindOneUserRequest;

    beforeAll(async () => {
      findOneUserRequest = {
        id: usersStub().id,
      };

      user = await usersController.remove(findOneUserRequest);
    });

    it('should call with proper parametrs and return object of user', () => {
      expect(usersService.remove).toHaveBeenCalledWith(findOneUserRequest.id);
      expect(user).toEqual(usersStub());
    });
  });
});
