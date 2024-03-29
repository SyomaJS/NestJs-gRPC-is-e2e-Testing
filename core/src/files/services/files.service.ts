import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateFileRequest,
  FindOneFileRequest,
  UpdateFileRequest,
} from '../../../globals/interfaces/file';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { File } from '../../../globals/entities/file.entity';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  async create(createFileRequest: CreateFileRequest) {
    try {
      const { file } = createFileRequest;

      const newFile = await this.createFileReturnName(file, createFileRequest);

      return newFile;
    } catch (error) {
      console.log(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'File creation failed',
      });
    }
  }

  async findAll(): Promise<{ files: File[] }> {
    const files = await this.fileRepository.find();
    return { files };
  }

  async createFileReturnName(
    file: any,
    createFileRequest: CreateFileRequest,
  ): Promise<File> {
    console.log(`In to the files Service: `);
    const { fileType } = createFileRequest;
    try {
      const fileName = uuid.v4() + `.${fileType}`;
      const filepath = path.resolve(__dirname, '../../../globals', 'media');

      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
      }

      fs.writeFileSync(path.join(filepath, fileName), file);

      const fullFileName = `http://localhost:3000/media/${fileName}`;
      const pathOfFile = path.resolve(filepath, fileName);

      const newFile = this.fileRepository.create({
        fileName: fullFileName,
        filePath: pathOfFile,
      });

      await this.fileRepository.save(newFile);

      return newFile;
    } catch (error) {
      console.log(error);
      throw new RpcException({
        code: grpc.status.UNKNOWN,
        message: 'Error creating file',
      });
    }
  }

  async findOne(findOneRequest: FindOneFileRequest): Promise<File> {
    const { id } = findOneRequest;
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: `File with ID ${id} not found`,
      });
    }
    return file;
  }

  async update(updateFileRequest: UpdateFileRequest): Promise<File> {
    const { id } = updateFileRequest;
    const file = await this.findOne({ id: id });
    this.fileRepository.merge(file, updateFileRequest);
    return await this.fileRepository.save(file);
  }

  async remove(findOneRequest: FindOneFileRequest): Promise<File> {
    const { id } = findOneRequest;
    const file = await this.findOne({ id: id });
    await this.fileRepository.remove(file);
    return file;
  }

  async getFileByRelation(fileIds: number[]): Promise<File[]> {
    const files = await this.fileRepository.find({
      where: { id: In(fileIds) },
      relations: ['courses'],
    });

    if (!files.length) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'File not found',
      });
    }

    return files;
  }
}
