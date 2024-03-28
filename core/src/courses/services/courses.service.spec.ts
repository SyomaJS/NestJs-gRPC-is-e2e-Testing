import { TestingModule, Test } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import {
  CreateCourseRequest,
  SetCourseFileRequest,
  UpdateCourseRequest,
} from '../../../globals/interfaces/course';
import { Course } from '../../../globals/entities/course.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FilesService } from '../../files/services/files.service';
import { RpcException } from '@nestjs/microservices';
import { mockCoursesRepository } from '../../../test/courses/__mocks__/course-repository.mock';
import { mockTestingCourse } from '../../../test/courses/__mocks__/course.mock';


describe('CoursesService', () => {
  let app: TestingModule;
  let coursesService: CoursesService;
  let updCourseName: 'Updated course Name';
  let newCourseName: string = 'New Course Name';

  const mockFilesService = {
    getFileByRelation: jest.fn().mockImplementation((fileIds: number[]) => {
      return fileIds.map((id) => ({ id, name: `File ${id}`, courses: [] }));
    }),
  };

  afterAll(async () => {
    await app.close();
    coursesService = null;
  });

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockCoursesRepository,
        },
        {
          provide: FilesService,
          useValue: mockFilesService,
        },
      ],
    }).compile();

    coursesService = app.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(coursesService).toBeDefined();
  });

  describe('"Create course" method', () => {
    const createCourseRequest: CreateCourseRequest = {
      courseName: newCourseName,
      duration: mockTestingCourse.duration,
      price: mockTestingCourse.price,
    };

    it('should return a new course object', async () => {
      const createdCourse = await coursesService.create(createCourseRequest);
      expect(createdCourse).toMatchObject({
        ...mockTestingCourse,
        courseName: newCourseName,
      });
    });

    it('should throw rpc Exception', () => {
      expect(
        coursesService.create({
          ...createCourseRequest,
          courseName: mockTestingCourse.courseName,
        }),
      ).rejects.toThrow(RpcException);
    });
  });

  describe('Find all courses', () => {
    it('should return all courses', async () => {
      const { courses } = await coursesService.findAll();
      expect(courses.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Find one course', () => {
    it('should return single course by id', async () => {
      const course = await coursesService.findOne({ id: mockTestingCourse.id });
      expect(course).toEqual(mockTestingCourse);
    });

    it('should throw rpc Exeption', async () => {
      expect(coursesService.findOne({ id: -1 })).rejects.toThrow(RpcException);
    });
  });

  describe('Update one course', () => {
    it('should return updated course', async () => {
      const updateCourseRequest: UpdateCourseRequest = {
        id: mockTestingCourse.id,
        courseName: updCourseName,
      };

      const course = await coursesService.update(updateCourseRequest);
      expect(course.courseName).toEqual(updCourseName);
    });
  });

  describe('Remove one course by ID', () => {
    it('should remove single course by ID', async () => {
      const course = await coursesService.remove({
        id: mockTestingCourse.id,
      });

      expect(course).toEqual(mockTestingCourse);
    });
  });

  describe('Add files to course', () => {
    const setCourseFileRequest: SetCourseFileRequest = {
      courseId: mockTestingCourse.id,
      fileIds: [1, 2, 3],
    };

    it('should connect files to the course', async () => {
      const response =
        await coursesService.addFilesToCourse(setCourseFileRequest);
      expect(response).toHaveProperty('course');
      expect(response).toHaveProperty('files');
      expect(response.course).toMatchObject(mockTestingCourse);
    });
  });

  describe('Remove files from course', () => {
    const setCourseFileRequest: SetCourseFileRequest = {
      courseId: mockTestingCourse.id,
      fileIds: [1],
    };

    it('should remove files from the course', async () => {
      const response =
        await coursesService.removeFilesFromCourse(setCourseFileRequest);
      expect(response).toHaveProperty('course');
      expect(response).toHaveProperty('files');
    });

    it('should throw an RpcException if course is not found', async () => {
      const invalidRequest: SetCourseFileRequest = {
        courseId: -1,
        fileIds: [1, 2, 3],
      };
      await expect(
        coursesService.removeFilesFromCourse(invalidRequest),
      ).rejects.toThrow(RpcException);
    });
  });
});
