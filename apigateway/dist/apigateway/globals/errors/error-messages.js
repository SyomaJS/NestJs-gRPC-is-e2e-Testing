"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGrpcErrorToHttpStatus = exports.INTERNAL_SERVER_ERROR = void 0;
const common_1 = require("@nestjs/common");
const grpc = require("@grpc/grpc-js");
exports.INTERNAL_SERVER_ERROR = 'Internal Server Error';
function mapGrpcErrorToHttpStatus(grpcErrorCode) {
    switch (grpcErrorCode) {
        case grpc.status.OK:
            return common_1.HttpStatus.OK;
        case grpc.status.CANCELLED:
            return common_1.HttpStatus.BAD_REQUEST;
        case grpc.status.UNKNOWN:
            return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        case grpc.status.INVALID_ARGUMENT:
            return common_1.HttpStatus.BAD_REQUEST;
        case grpc.status.DEADLINE_EXCEEDED:
            return common_1.HttpStatus.REQUEST_TIMEOUT;
        case grpc.status.NOT_FOUND:
            return common_1.HttpStatus.NOT_FOUND;
        case grpc.status.ALREADY_EXISTS:
            return common_1.HttpStatus.CONFLICT;
        case grpc.status.PERMISSION_DENIED:
            return common_1.HttpStatus.FORBIDDEN;
        case grpc.status.RESOURCE_EXHAUSTED:
            return common_1.HttpStatus.TOO_MANY_REQUESTS;
        case grpc.status.FAILED_PRECONDITION:
            return common_1.HttpStatus.PRECONDITION_FAILED;
        case grpc.status.ABORTED:
            return common_1.HttpStatus.CONFLICT;
        case grpc.status.OUT_OF_RANGE:
            return common_1.HttpStatus.BAD_REQUEST;
        case grpc.status.UNIMPLEMENTED:
            return common_1.HttpStatus.NOT_IMPLEMENTED;
        case grpc.status.INTERNAL:
            return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        case grpc.status.UNAVAILABLE:
            return common_1.HttpStatus.SERVICE_UNAVAILABLE;
        case grpc.status.DATA_LOSS:
            return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        case grpc.status.UNAUTHENTICATED:
            return common_1.HttpStatus.UNAUTHORIZED;
        default:
            return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
exports.mapGrpcErrorToHttpStatus = mapGrpcErrorToHttpStatus;
//# sourceMappingURL=error-messages.js.map