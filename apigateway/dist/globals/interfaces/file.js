"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_SERVICE_NAME = exports.FileServiceControllerMethods = exports.FILE_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "file";
exports.FILE_PACKAGE_NAME = "file";
function FileServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["createFile", "findAllFiles", "findOneFile", "updateFile", "removeFile"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("FileService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = ["queryFile"];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("FileService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.FileServiceControllerMethods = FileServiceControllerMethods;
exports.FILE_SERVICE_NAME = "FileService";
//# sourceMappingURL=file.js.map