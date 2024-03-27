import { LogoutUserRequest } from './../../../../apigateway/dist/globals/interfaces/auth.d';
import { tokens, usersStub } from '../test/stubs/users.stub';
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from '../../../globals/interfaces/auth';

export const mockUsersService = {

  signup: jest.fn().mockImplementation((createUserRequest: CreateUserRequest) => {
      
    return Promise.resolve(usersStub());

  }),
          
  login: jest.fn().mockImplementation((loginUserRequest: LoginUserRequest) => {
    
    return Promise.resolve( { user: usersStub(),  tokens: tokens } );

  }),


  findOne: jest.fn().mockImplementation((id: string) => {

    return Promise.resolve(usersStub());

  }),


  logout: jest.fn().mockImplementation((logoutUserRequest: LogoutUserRequest) => {

    return Promise.resolve(usersStub());

  }),

  findAll: jest.fn().mockImplementation(() => {

    return Promise.resolve([usersStub()]);

  }),

   findAllOnService: jest.fn().mockImplementation(() => {

    return Promise.resolve( { users: [usersStub()] } );

  }),


  update: jest.fn().mockImplementation((id: string, updateUserRequest: UpdateUserRequest) => {

    return Promise.resolve(usersStub());

  }),

  remove: jest.fn().mockImplementation((id: string) => {

    return Promise.resolve(usersStub());

  }),
};
