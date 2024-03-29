import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from '../services/files.service';
import { FilesController } from './files.controller';
import {
  CreateFileRequest,
  FindOneFileRequest,
  UpdateFileRequest,
} from '../../../globals/interfaces/file';
import { mockTestingFile } from '../../../test/courses/__mocks__/course.mock';

describe('FilesController', () => {
  let app: TestingModule;
  let filesController: FilesController;
  let filesService: FilesService;

  let mockTestingFilesService = {
    create: jest.fn().mockImplementation((createFileRequest: CreateFileRequest) => {
        return Promise.resolve(mockTestingFile);
    }),

    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve([mockTestingFile]);
    }),

    findOne: jest.fn().mockImplementation((findOneFileRequest: FindOneFileRequest) => {
        return Promise.resolve(mockTestingFile);
    }),

    update: jest.fn().mockImplementation((findOneFileRequest: FindOneFileRequest) => {
        return Promise.resolve(mockTestingFile);
    }),

    remove: jest.fn().mockImplementation((findOneFileRequest: FindOneFileRequest) => {
        return Promise.resolve(mockTestingFile);
    }),

  };


  beforeAll(async () => {

    app = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        {
          provide: FilesService,
          useValue: mockTestingFilesService,
        },
      ],
    }).compile();

    filesController = app.get<FilesController>(FilesController);
    filesService = app.get<FilesService>(FilesService);

  });

  afterAll(async () => {
    app.close();
    filesController = null;
    filesService = null;
  });

  it('should be defined', () => {
    expect(filesController).toBeDefined();
    expect(filesService).toBeDefined();
  });

  describe('"getAllFiles" method', () => {
    it('should return all files', () => {
      const result = filesController.findAll();

      expect(filesService.findAll).toHaveBeenCalled();

      expect(result).resolves.toEqual([mockTestingFile]);
    });
  });

  describe('"CreateFile" method', () => {

    it('should create a new file', () => {
      const createFileRequest: CreateFileRequest = {
        fileName: mockTestingFile.fileName,
        fileType: 'jpg',
        file: "test.jpg"
      };
      const result = filesController.create(createFileRequest);

      expect(filesService.create).toHaveBeenCalled();

      expect(result).resolves.toEqual(mockTestingFile);
    });

  });

  describe('"findAllFiles" method', () => {

    it('should return all files', async () => {

      const result = await filesController.findAll();

      expect(filesService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockTestingFile]);

    });
  });

  describe('"findOneFile" method', () => {

    it('should return a single file', async () => {

      const findOneFileRequest: FindOneFileRequest = {
        id: mockTestingFile.id,
      };

      const result = await filesController.findOne(findOneFileRequest);

      expect(filesService.findOne).toHaveBeenCalledWith(findOneFileRequest);
      expect(result).toEqual(mockTestingFile);

    });
  });

  describe('"updateFile" method', () => {

    it('should update a file', async () => {

      const updateFileRequest: UpdateFileRequest = {
        id: mockTestingFile.id,
        fileName: 'Updated Name',
      };

      const result = await filesController.update(updateFileRequest);

      expect(filesService.update).toHaveBeenCalledWith(updateFileRequest);
      expect(result).toEqual(mockTestingFile);

    });

  });

  describe('"removeFile" method', () => {

    it('should remove a file', async () => {

      const findOneFileRequest: FindOneFileRequest = {
        id: mockTestingFile.id,
      };

      const result = await filesController.remove(findOneFileRequest);

      expect(filesService.remove).toHaveBeenCalledWith(findOneFileRequest);
      expect(result).toEqual(mockTestingFile);

    });
    
  });

});
