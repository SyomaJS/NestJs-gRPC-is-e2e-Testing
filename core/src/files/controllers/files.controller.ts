import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { FilesService } from '../services/files.service';
import {
  CreateFileRequest,
  FILE_SERVICE_NAME,
  FindOneFileRequest,
  UpdateFileRequest,
} from '../../../globals/interfaces/file';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @GrpcMethod(FILE_SERVICE_NAME, 'createFile')
  create(@Payload() createFileRequest: CreateFileRequest) {
    console.log(`CreateFileRequest: ${createFileRequest}`);
    return this.filesService.create(createFileRequest);
  }
  
  @GrpcMethod(FILE_SERVICE_NAME, 'findAllFiles')
  findAll() {
    return this.filesService.findAll();
  }

  @GrpcMethod(FILE_SERVICE_NAME, 'findOneFile')
  findOne(@Payload() findOneRequest: FindOneFileRequest) {
    return this.filesService.findOne(findOneRequest);
  }

  @GrpcMethod(FILE_SERVICE_NAME, 'updateFile')
  update(@Payload() updateFileRequest: UpdateFileRequest) {
    return this.filesService.update(updateFileRequest);
  }

  @GrpcMethod(FILE_SERVICE_NAME, 'removeFile')
  remove(@Payload() findOneRequest: FindOneFileRequest) {
    return this.filesService.remove(findOneRequest);
  }

  // createFile(
  //   fileBuffer: Buffer,
  //   fileType: string,
  // ): Observable<CreateFileResponse> {
  //   const createFileRequest: Observable<CreateFileRequest> = of({
  //     file: fileBuffer,
  //     fileType: fileType,
  //   });

  //   return this.filesService.create(createFileRequest);
  // }
}
