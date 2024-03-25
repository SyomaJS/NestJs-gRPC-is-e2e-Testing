import { HttpStatus } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';

export const INTERNAL_SERVER_ERROR = 'Internal Server Error';

export function mapGrpcErrorToHttpStatus(grpcErrorCode: number): number {
  switch (grpcErrorCode) {
    case grpc.status.OK:
      return HttpStatus.OK;
    case grpc.status.CANCELLED:
      return HttpStatus.BAD_REQUEST;
    case grpc.status.UNKNOWN:
      return HttpStatus.INTERNAL_SERVER_ERROR;
    case grpc.status.INVALID_ARGUMENT:
      return HttpStatus.BAD_REQUEST;
    case grpc.status.DEADLINE_EXCEEDED:
      return HttpStatus.REQUEST_TIMEOUT;
    case grpc.status.NOT_FOUND:
      return HttpStatus.NOT_FOUND;
    case grpc.status.ALREADY_EXISTS:
      return HttpStatus.CONFLICT;
    case grpc.status.PERMISSION_DENIED:
      return HttpStatus.FORBIDDEN;
    case grpc.status.RESOURCE_EXHAUSTED:
      return HttpStatus.TOO_MANY_REQUESTS;
    case grpc.status.FAILED_PRECONDITION:
      return HttpStatus.PRECONDITION_FAILED;
    case grpc.status.ABORTED:
      return HttpStatus.CONFLICT;
    case grpc.status.OUT_OF_RANGE:
      return HttpStatus.BAD_REQUEST;
    case grpc.status.UNIMPLEMENTED:
      return HttpStatus.NOT_IMPLEMENTED;
    case grpc.status.INTERNAL:
      return HttpStatus.INTERNAL_SERVER_ERROR;
    case grpc.status.UNAVAILABLE:
      return HttpStatus.SERVICE_UNAVAILABLE;
    case grpc.status.DATA_LOSS:
      return HttpStatus.INTERNAL_SERVER_ERROR;
    case grpc.status.UNAUTHENTICATED:
      return HttpStatus.UNAUTHORIZED;
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
