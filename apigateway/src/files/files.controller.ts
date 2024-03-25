import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  OnModuleInit,
  Inject,
  Body,
  Put,
  HttpException,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import {
  CreateFileRequest,
  FILE_SERVICE_NAME,
  FileServiceClient,
  UpdateFileRequest,
} from "../../globals/interfaces/file";
import { mapGrpcErrorToHttpStatus } from "../../globals/errors/error-messages";
import { CreateFileDto } from "../../globals/dto/create-file.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("files")
export class FilesController implements OnModuleInit {
  private filesService: FileServiceClient;

  constructor(@Inject(FILE_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.filesService =
      this.client.getService<FileServiceClient>(FILE_SERVICE_NAME);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Body() createFileDto: CreateFileDto,
    @UploadedFile() file: any
  ) {
    try {
      console.log(`File: `, file);
      const fileBuffer = file?.buffer;
      console.log(fileBuffer);
      const createFileRequest: CreateFileRequest = {
        ...createFileDto,
        file: fileBuffer,
        fileType: file?.mimetype?.split("/")[1],
      };

      return await firstValueFrom(
        this.filesService.createFile(createFileRequest)
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get("get-all")
  async findAll() {
    try {
      const response = await firstValueFrom(this.filesService.findAllFiles({}));
      return response.files ? response.files : [];
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get("get/:id")
  async findOne(@Param("id") id: string) {
    try {
      return await firstValueFrom(this.filesService.findOneFile({ id: +id }));
    } catch (error) {
      this.handleError(error);
    }
  }

  @Put("update/:id")
  async update(
    @Param("id") id: string,
    @Body() updateFileRequest: UpdateFileRequest
  ) {
    try {
      return await firstValueFrom(
        this.filesService.updateFile({ id: +id, ...updateFileRequest })
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  @Delete("delete/:id")
  async remove(@Param("id") id: string) {
    try {
      await firstValueFrom(this.filesService.removeFile({ id: +id }));
      return { message: "Successfully deleted !" };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    const statusCode = mapGrpcErrorToHttpStatus(error.code);
    throw new HttpException(error.message, statusCode);
  }
}
