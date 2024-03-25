import { OnModuleInit } from "@nestjs/common";
import { UpdateUserRequest } from "../../globals/interfaces/auth";
import { ClientGrpc } from "@nestjs/microservices";
import { Response } from "express";
import { SignUpUserDto } from "../../globals/dto/signup-user.dto";
import { LoginUserDto } from "../../globals/dto/login-user.dto";
export declare class UsersController implements OnModuleInit {
    private readonly client;
    private usersService;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    create(signUpUserDto: SignUpUserDto): Promise<import("../../globals/interfaces/auth").User>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<{
        user: import("../../globals/interfaces/auth").User;
        accessToken: string;
    }>;
    logout(refreshToken: string, res: Response): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("../../globals/interfaces/auth").User[]>;
    findOne(id: string): Promise<import("../../globals/interfaces/auth").User>;
    update(id: string, updateUserDto: UpdateUserRequest): Promise<import("../../globals/interfaces/auth").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
    private handleError;
}
