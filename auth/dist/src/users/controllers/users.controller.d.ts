import { UsersService } from '../services/users.service';
import { CreateUserRequest, FindOneUserRequest, LoginUserRequest, LogoutUserRequest, UpdateUserRequest } from '../../../globals/interfaces/auth';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(createUserRequest: CreateUserRequest): Promise<import("globals/entities/user.entity").User>;
    login(loginUserRequest: LoginUserRequest): Promise<import("../../../globals/interfaces/auth").LoginResponse>;
    logout(logoutUserRequest: LogoutUserRequest): Promise<import("globals/entities/user.entity").User>;
    findAll(): Promise<{
        users: import("globals/entities/user.entity").User[];
    }>;
    findOne(findOneReq: FindOneUserRequest): Promise<import("globals/entities/user.entity").User>;
    update(updateUserDto: UpdateUserRequest): Promise<import("globals/entities/user.entity").User>;
    remove(findOne: FindOneUserRequest): Promise<import("globals/entities/user.entity").User>;
}
