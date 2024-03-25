"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const auth_1 = require("../../globals/interfaces/auth");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: auth_1.USERS_SERVICE_NAME,
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        url: "localhost:50051",
                        package: auth_1.protobufPackage,
                        protoPath: (0, path_1.resolve)(__dirname, "../../globals/protos/auth.proto"),
                    },
                },
            ]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map