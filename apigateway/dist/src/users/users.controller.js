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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("../../globals/interfaces/auth");
const rxjs_1 = require("rxjs");
const cookieGetter_decorator_1 = require("../../globals/decorators/cookieGetter.decorator");
const error_messages_1 = require("../../globals/errors/error-messages");
const signup_user_dto_1 = require("../../globals/dto/signup-user.dto");
const login_user_dto_1 = require("../../globals/dto/login-user.dto");
let UsersController = class UsersController {
    constructor(client) {
        this.client = client;
    }
    onModuleInit() {
        this.usersService =
            this.client.getService(auth_1.USERS_SERVICE_NAME);
    }
    async create(signUpUserDto) {
        try {
            const userData = await (0, rxjs_1.firstValueFrom)(this.usersService.createUser(signUpUserDto));
            return userData;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async login(loginUserDto, res) {
        try {
            const userData = await (0, rxjs_1.firstValueFrom)(this.usersService.loginUser(loginUserDto));
            res.cookie("refreshToken", userData.tokens.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return { user: userData.user, accessToken: userData.tokens.accessToken };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async logout(refreshToken, res) {
        try {
            await (0, rxjs_1.firstValueFrom)(this.usersService.logoutUser({ refreshToken }));
            res.clearCookie("refreshToken");
            return { message: "User successfully logged out" };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async findAll() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.usersService.findAllUsers(null));
            return response.users ? response.users : [];
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const user = await (0, rxjs_1.firstValueFrom)(this.usersService.findOneUser({ id: +id }));
            return user;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async update(id, updateUserDto) {
        try {
            const updatedUser = await (0, rxjs_1.firstValueFrom)(this.usersService.updateUser({ id: +id, ...updateUserDto }));
            return updatedUser;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async remove(id) {
        try {
            const user = await (0, rxjs_1.firstValueFrom)(this.usersService.removeUser({ id: +id }));
            return { message: "User successfully deleted" };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    handleError(error) {
        const statusCode = (0, error_messages_1.mapGrpcErrorToHttpStatus)(error.code);
        throw new common_1.HttpException(error.message, statusCode);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_user_dto_1.SignUpUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("signin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("signout"),
    __param(0, (0, cookieGetter_decorator_1.CookieGetter)("refreshToken")),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)("get-all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("get/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __param(0, (0, common_1.Inject)(auth_1.USERS_SERVICE_NAME)),
    __metadata("design:paramtypes", [Object])
], UsersController);
//# sourceMappingURL=users.controller.js.map