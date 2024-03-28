import { HttpStatus, Injectable } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';

import {
  CreateUserRequest,
  LoginResponse,
  LoginUserRequest,
  LogoutUserRequest,
  UpdateUserRequest,
} from '../../../globals/interfaces/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../globals/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../../redis/redis.service';
import { IPayloadType } from '../../../globals/types/payload.type';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async login(loginUserRequest: LoginUserRequest) {
    const { login, password } = loginUserRequest;
    const user = await this.userRepository.findOneBy({ login });

    if (!user) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Wrong login or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Wrong login or password',
      });
    }

    const tokens = await this.getTokens(user);

    const setDto = {
      key: `refresh_token_${user.id}`,
      value: tokens.refresh_token,
    };

    await this.redisService.set(setDto);

    const res: LoginResponse = {
      user: user,
      tokens: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
    };

    return res;
  }

  async signup(createUserRequest: CreateUserRequest) {
    const { login, password } = createUserRequest;

    const existingUser = await this.userRepository.findOneBy({ login });
    if (existingUser) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'Login already in use',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = this.userRepository.create({
      ...createUserRequest,
      hashedPassword: hashedPassword,
      isActive: true,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async logout(logoutUserRequest: LogoutUserRequest): Promise<User> {
    const { refreshToken } = logoutUserRequest;
    const userData: IPayloadType = await this.jwtService.decode(refreshToken);

    if (!userData) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid token',
      });
    }

    const user = await this.userRepository.findOne({
      where: { id: userData.id },
    });
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }

    const tokenExists = await this.redisService.get(
      `refresh_token_${userData.id}`,
    );

    if (!tokenExists) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Token not found',
      });
    }

    await this.redisService.del(`refresh_token_${userData.id}`);

    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }

    return user;
  }

  async findAll(): Promise<{ users: User[] }> {
    const users = await this.userRepository.find();
    return { users };
  }

  async update(id: number, updateUserDto: UpdateUserRequest): Promise<User> {
    const user = await this.findOne(id);

    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return user;
  }

  // - - - - - - - | Get Token for users | - - - - - - - //

  async getTokens(user: User) {
    let jwtPayload: any;

    jwtPayload = {
      id: user.id,
      login: user.login,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
