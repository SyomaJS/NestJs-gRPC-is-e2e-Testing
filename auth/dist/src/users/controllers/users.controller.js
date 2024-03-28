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
const microservices_1 = require("@nestjs/microservices");
const users_service_1 = require("../services/users.service");
const auth_1 = require("../../../globals/interfaces/auth");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    signup(createUserRequest) {
        return this.usersService.signup(createUserRequest);
    }
    login(loginUserRequest) {
        return this.usersService.login(loginUserRequest);
    }
    logout(logoutUserRequest) {
        return this.usersService.logout(logoutUserRequest);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(findOneReq) {
        return this.usersService.findOne(findOneReq.id);
    }
    update(updateUserDto) {
        console.log('Update user ');
        return this.usersService.update(updateUserDto.id, updateUserDto);
    }
    remove(findOne) {
        return this.usersService.remove(findOne.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, microservices_1.GrpcMethod)(auth_1.USERS_SERVICE_NAME, 'CreateUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signup", null);
__decorate([
    (0, microservices_1.GrpcMethod)(auth_1.USERS_SERVICE_NAME, 'LoginUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, microservices_1.GrpcMethod)(auth_1.USERS_SERVICE_NAME, 'LogoutUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "logout", null);
__decorate([
    (0, microservices_1.GrpcMethod)(auth_1.USERS_SERVICE_NAME, 'FindAllUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.GrpcMethod)(auth_1.USERS_SERVICE_NAME, 'findOneUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)(auth_1.USERS_SERVICE_NAME, 'updateUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, microservices_1.GrpcMethod)(auth_1.USERS_SERVICE_NAME, 'removeUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map