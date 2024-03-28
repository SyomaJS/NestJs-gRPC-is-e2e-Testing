import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { CreateFileRequest } from '../../../globals/interfaces/file';
import { NotFoundException } from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { File } from '../../../../globals/entities/file.entity';

describe('FilesController', () => {
  let controller: FilesController;
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        {
          provide: FilesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            getFileByRelation: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a file', async () => {
      const file: CreateFileRequest = {
        file: Buffer.from('test'),
        fileType: 'txt',
        fileName: 'some name',
      };

      const result: File = {
        id: 1,
        fileName: 'test.txt',
        filePath: '/path/to/test.txt',
        courses: [],
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(file)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(file);
    });
  });

  describe('findAll', () => {

    it('should return an array of files', async () => {
      const result: { files: File[] } = {
        files: [
          {
            id: 1,
            fileName: 'test.txt',
            filePath: '/path/to/test.txt',
            courses: [],
          },
        ],
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a file', async () => {
      const id = 1;
      const result: File = {
        id,
        fileName: 'test.txt',
        filePath: '/path/to/test.txt',
        courses: []
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne({ id })).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith({ id });
    });

    it('should throw NotFoundException if file not found', async () => {
      const id = 2;

      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne({ id })).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith({ id });

    });
  });

  describe('update', () => {
    it('should update a file', async () => {
      const id = 1;
      const updateFileRequest = {
        id,
        fileName: 'updated.txt',
      };
      const result: File = {
        id,
        fileName: 'updated.txt',
        filePath: '/path/to/updated.txt',
        courses: []
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(updateFileRequest)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(updateFileRequest);
    });
  });

  describe('remove', () => {
    
    it('should remove a file', async () => {
      const id = 1;
      const result: File = {
        id,
        fileName: 'test.txt',
        filePath: '/path/to/test.txt',
        courses: []
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove({ id })).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith({ id });

    });
  });
});
