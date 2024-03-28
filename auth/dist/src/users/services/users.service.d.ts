import { CreateUserRequest, LoginResponse, LoginUserRequest, LogoutUserRequest, UpdateUserRequest } from '../../../globals/interfaces/auth';
import { Repository } from 'typeorm';
import { User } from '../../../globals/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../../redis/redis.service';
export declare class UsersService {
    private userRepository;
    private readonly jwtService;
    private readonly redisService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, redisService: RedisService);
    login(loginUserRequest: LoginUserRequest): Promise<LoginResponse>;
    signup(createUserRequest: CreateUserRequest): Promise<User>;
    logout(logoutUserRequest: LogoutUserRequest): Promise<User>;
    findOne(id: number): Promise<User>;
    findAll(): Promise<{
        users: User[];
    }>;
    update(id: number, updateUserDto: UpdateUserRequest): Promise<User>;
    remove(id: number): Promise<User>;
    getTokens(user: User): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
