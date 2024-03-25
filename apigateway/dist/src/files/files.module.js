"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const files_controller_1 = require("./files.controller");
const file_1 = require("../../globals/interfaces/file");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: file_1.FILE_SERVICE_NAME,
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        url: "localhost:50052",
                        package: file_1.protobufPackage,
                        protoPath: (0, path_1.join)(__dirname, "../../globals/protos/file.proto"),
                    },
                },
            ]),
        ],
        controllers: [files_controller_1.FilesController],
        providers: [],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map