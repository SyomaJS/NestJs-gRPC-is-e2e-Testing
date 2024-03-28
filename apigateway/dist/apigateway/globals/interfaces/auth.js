"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS_SERVICE_NAME = exports.UsersServiceControllerMethods = exports.AUTH_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "auth";
exports.AUTH_PACKAGE_NAME = "auth";
function UsersServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = [
            "createUser",
            "findAllUsers",
            "findOneUser",
            "updateUser",
            "removeUser",
            "loginUser",
            "logoutUser",
        ];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("UsersService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = ["queryUsers"];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("UsersService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.UsersServiceControllerMethods = UsersServiceControllerMethods;
exports.USERS_SERVICE_NAME = "UsersService";
//# sourceMappingURL=auth.js.map