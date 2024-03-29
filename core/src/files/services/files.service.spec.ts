import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import {
  CreateFileRequest,
  FindOneFileRequest,
  UpdateFileRequest,
} from '../../../globals/interfaces/file';
import { File } from '../../../globals/entities/file.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockTestingFile } from '../../../test/courses/__mocks__/course.mock';



export const mockFileRepository = {
    create: jest.fn().mockImplementation((createFileRequest: CreateFileRequest) => {
        return { ...mockTestingFile, ...createFileRequest };
    }),

    save: jest.fn().mockImplementation((file: File) => {
        return { ...mockTestingFile, ...file };
    }),

    merge: jest.fn().mockImplementation((target: File, ...sources: Partial<File>[]) => {
        sources.forEach((source) => {
            Object.assign(target, source);
        });
        return target;
    }),

    findOneBy: jest.fn().mockImplementation((conditions: any) => {

        if (conditions.id === mockTestingFile.id) {
        return Promise.resolve(mockTestingFile);
        }
        return Promise.resolve(null);

    }),

    find: jest.fn().mockImplementation(() => {
        return [mockTestingFile];
    }),

    update: jest.fn().mockImplementation((updateFileRequest: UpdateFileRequest) => {
        return { ...mockTestingFile, ...updateFileRequest };
    }),

    remove: jest.fn().mockImplementation((findOneFileRequest: FindOneFileRequest) => {
        return mockTestingFile;
    }),
};



describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {

      const module: TestingModule = await Test.createTestingModule({
          providers: [
              FilesService,
              {
                provide: getRepositoryToken(File),
                useValue: mockFileRepository,
              },
          ],
      }).compile();

      service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
      expect(service).toBeDefined();
  });

  describe('create', () => {

      it('should create a file', async () => {
          const createFileRequest: CreateFileRequest = {
            file: Buffer.from('some data'),
            fileType: 'jpg',
            fileName: 'some file',
          };

          const createdFile = await service.create(createFileRequest);

          expect(createdFile.fileName).toEqual(expect.any(String));
          expect(createdFile.filePath).toEqual(expect.any(String));

      });

  });

  describe('findAll', () => {

    it('should return an array of files', async () => {

      const { files } = await service.findAll();
      expect(files).toEqual([mockTestingFile]);

    });

  });

  describe('findOne', () => {

    it('should return a single file', async () => {

      const findOneRequest: FindOneFileRequest = { id: 1 };
      const file = await service.findOne(findOneRequest);
      expect(file).toEqual(mockTestingFile);

    });

  });

  describe('"update" method', () => {

    it('should update a file', async () => {
      const updateFileRequest: UpdateFileRequest = {
        id: 1,
        fileName: 'updated.jpg',
      };

      const updatedFile = await service.update(updateFileRequest);
      console.log(`Upd file: `, updatedFile);

      expect(updatedFile.fileName).toEqual(updateFileRequest.fileName)
    });
  });

  describe('remove', () => {

      it('should remove a file', async () => {

          const findOneRequest: FindOneFileRequest = { id: 1 };
          const removedFile = await service.remove(findOneRequest);
          expect(removedFile).toEqual(mockTestingFile);
          
      });

  });
  
});
