import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from '../services/courses.service';
import { CoursesController } from './courses.controller';
import {
  CreateCourseRequest,
  FindOneCourseRequest,
  SetCourseFileRequest,
  UpdateCourseRequest,
} from '../../../globals/interfaces/course';
import { mockTestingCourse } from '../../../test/courses/__mocks__/course.mock';

describe('CoursesController', () => {
  let app: TestingModule;
  let coursesController: CoursesController;
  let coursesService: CoursesService;

  let mockTestingCoursesService = {
    create: jest
      .fn()
      .mockImplementation((createCourseRequest: CreateCourseRequest) => {
        return Promise.resolve(mockTestingCourse);
      }),

    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve([mockTestingCourse]);
    }),

    findOne: jest
      .fn()
      .mockImplementation((findOneCourseRequest: FindOneCourseRequest) => {
        return Promise.resolve(mockTestingCourse);
      }),

    update: jest
      .fn()
      .mockImplementation((findOneCourseRequest: FindOneCourseRequest) => {
        return Promise.resolve(mockTestingCourse);
      }),

    remove: jest
      .fn()
      .mockImplementation((findOneCourseRequest: FindOneCourseRequest) => {
        return Promise.resolve(mockTestingCourse);
      }),

    addFilesToCourse: jest
      .fn()
      .mockImplementation((setCourseFileRequest: SetCourseFileRequest) => {
        return Promise.resolve({ course: mockTestingCourse, files: [] });
      }),

    removeFilesFromCourse: jest
      .fn()
      .mockImplementation((setCourseFileRequest: SetCourseFileRequest) => {
        return Promise.resolve({ course: mockTestingCourse, files: [] });
      }),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: mockTestingCoursesService,
        },
      ],
    }).compile();

    coursesController = app.get<CoursesController>(CoursesController);
    coursesService = app.get<CoursesService>(CoursesService);
  });

  afterAll(async () => {
    app.close();
    coursesController = null;
    coursesService = null;
  });

  it('should be defined', () => {
    expect(coursesController).toBeDefined();
    expect(coursesService).toBeDefined();
  });

  describe('"getAllCourses" method', () => {
    it('should return all courses', () => {
      const result = coursesController.findAll();

      expect(coursesService.findAll).toHaveBeenCalled();

      expect(result).resolves.toEqual([mockTestingCourse]);
    });
  });

  describe('"CreateCourse" method', () => {
    it('should create a new course', () => {
      const createCourseRequest: CreateCourseRequest = {
        courseName: mockTestingCourse.courseName,
        duration: mockTestingCourse.duration,
        price: mockTestingCourse.price,
      };
      const result = coursesController.create(createCourseRequest);

      expect(coursesService.create).toHaveBeenCalled();

      expect(result).resolves.toEqual(mockTestingCourse);
    });
  });

  describe('"findAllCourses" method', () => {
    it('should return all courses', async () => {
      const result = await coursesController.findAll();

      expect(coursesService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockTestingCourse]);
    });
  });

  describe('"findOneCourse" method', () => {
    it('should return a single course', async () => {
      const findOneCourseRequest: FindOneCourseRequest = {
        id: mockTestingCourse.id,
      };
      const result = await coursesController.findOne(findOneCourseRequest);

      expect(coursesService.findOne).toHaveBeenCalledWith(findOneCourseRequest);
      expect(result).toEqual(mockTestingCourse);
    });
  });

  describe('"updateCourse" method', () => {
    it('should update a course', async () => {
      const updateCourseRequest: UpdateCourseRequest = {
        id: mockTestingCourse.id,
        courseName: 'Updated Name',
        duration: 20,
        price: 3000000,
      };

      const result = await coursesController.update(updateCourseRequest);

      expect(coursesService.update).toHaveBeenCalledWith(updateCourseRequest);
      expect(result).toEqual(mockTestingCourse);
    });
  });

  describe('"removeCourse" method', () => {
    it('should remove a course', async () => {
      const findOneCourseRequest: FindOneCourseRequest = {
        id: mockTestingCourse.id,
      };
      const result = await coursesController.remove(findOneCourseRequest);

      expect(coursesService.remove).toHaveBeenCalledWith(findOneCourseRequest);
      expect(result).toEqual(mockTestingCourse);
    });
  });

  describe('"addFilesToCourse" method', () => {
    it('should add files to a course', async () => {
      const setCourseFileRequest: SetCourseFileRequest = {
        courseId: mockTestingCourse.id,
        fileIds: [1, 2, 3],
      };

      const result =
        await coursesController.addFilesToCourse(setCourseFileRequest);

      expect(coursesService.addFilesToCourse).toHaveBeenCalled();

      expect(result).toEqual({ course: mockTestingCourse, files: [] });
    });
  });

  describe('"removeFilesFromCourse" method', () => {
    it('should remove files from a course', async () => {
      const setCourseFileRequest: SetCourseFileRequest = {
        courseId: mockTestingCourse.id,
        fileIds: [1, 2],
      };

      const result =
        await coursesController.removeFilesFromCourse(setCourseFileRequest);

      expect(coursesService.removeFilesFromCourse).toHaveBeenCalled();

      expect(result).toEqual({ course: mockTestingCourse, files: [] });
    });
  });
});
