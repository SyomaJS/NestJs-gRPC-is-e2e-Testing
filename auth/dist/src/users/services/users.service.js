"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const grpc = require("@grpc/grpc-js");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../../globals/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const redis_service_1 = require("../../redis/redis.service");
const microservices_1 = require("@nestjs/microservices");
let UsersService = class UsersService {
    constructor(userRepository, jwtService, redisService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.redisService = redisService;
    }
    async login(loginUserRequest) {
        const { login, password } = loginUserRequest;
        const user = await this.userRepository.findOneBy({ login });
        if (!user) {
            throw new microservices_1.RpcException({
                code: grpc.status.UNAUTHENTICATED,
                message: 'Wrong login or password',
            });
        }
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            throw new microservices_1.RpcException({
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
        const res = {
            user: user,
            tokens: {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
            },
        };
        return res;
    }
    async signup(createUserRequest) {
        const { login, password } = createUserRequest;
        const existingUser = await this.userRepository.findOneBy({ login });
        if (existingUser) {
            throw new microservices_1.RpcException({
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
    async logout(logoutUserRequest) {
        const { refreshToken } = logoutUserRequest;
        const userData = await this.jwtService.decode(refreshToken);
        if (!userData) {
            throw new microservices_1.RpcException({
                code: grpc.status.UNAUTHENTICATED,
                message: 'Invalid token',
            });
        }
        const user = await this.userRepository.findOne({
            where: { id: userData.id },
        });
        if (!user) {
            throw new microservices_1.RpcException({
                code: grpc.status.NOT_FOUND,
                message: 'User not found',
            });
        }
        const tokenExists = await this.redisService.get(`refresh_token_${userData.id}`);
        if (!tokenExists) {
            throw new microservices_1.RpcException({
                code: grpc.status.UNAUTHENTICATED,
                message: 'Token not found',
            });
        }
        await this.redisService.del(`refresh_token_${userData.id}`);
        return user;
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new microservices_1.RpcException({
                code: grpc.status.NOT_FOUND,
                message: 'User not found',
            });
        }
        return user;
    }
    async findAll() {
        const users = await this.userRepository.find();
        return { users };
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        this.userRepository.merge(user, updateUserDto);
        await this.userRepository.save(user);
        return user;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
        return user;
    }
    async getTokens(user) {
        let jwtPayload;
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        redis_service_1.RedisService])
], UsersService);
//# sourceMappingURL=users.service.js.map