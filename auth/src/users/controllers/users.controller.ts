import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UsersService } from '../services/users.service';
import {
  CreateUserRequest,
  FindOneUserRequest,
  LoginUserRequest,
  LogoutUserRequest,
  UpdateUserRequest,
  USERS_SERVICE_NAME,
} from '../../../globals/interfaces/auth';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(USERS_SERVICE_NAME, 'CreateUser')
  signup(@Payload() createUserRequest: CreateUserRequest) {
    return this.usersService.signup(createUserRequest);
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'LoginUser')
  login(@Payload() loginUserRequest: LoginUserRequest) {
    return this.usersService.login(loginUserRequest);
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'LogoutUser')
  logout(@Payload() logoutUserRequest: LogoutUserRequest) {
    return this.usersService.logout(logoutUserRequest);
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'FindAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'findOneUser')
  findOne(@Payload() findOneReq: FindOneUserRequest) {
    return this.usersService.findOne(findOneReq.id);
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'updateUser')
  update(@Payload() updateUserDto: UpdateUserRequest) {
    console.log('Update user ');
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'removeUser')
  remove(@Payload() findOne: FindOneUserRequest) {
    return this.usersService.remove(findOne.id);
  }
}
