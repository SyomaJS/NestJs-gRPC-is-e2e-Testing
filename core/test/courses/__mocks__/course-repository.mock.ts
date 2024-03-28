import { Course } from "../../../globals/entities/course.entity";
import { Course as ICourse, CreateCourseRequest, FindOneCourseRequest, UpdateCourseRequest } from "../../../globals/interfaces/course";
import { mockTestingCourse } from "./course.mock";


export const mockCoursesRepository = {
    create: jest.fn().mockImplementation((createCourseRequest: CreateCourseRequest) => {
        return createCourseRequest;
    }),

    save: jest.fn().mockImplementation((course: Course) => {
        course.id = mockTestingCourse.id;
        course.files = mockTestingCourse.files;
        return course;
    }),

    merge: jest.fn().mockImplementation((target: ICourse, ...sources: Partial<ICourse>[]) => {
        sources.forEach((source) => {
            Object.assign(target, source);
        });
        return target;
    }),

    findOneBy: jest.fn().mockImplementation((conditions: any) => {
        
        if (conditions.courseName === mockTestingCourse.courseName) {
        return Promise.resolve(mockTestingCourse);
        } else if (conditions.id == mockTestingCourse.id) {
        return Promise.resolve(mockTestingCourse);
        } else if (conditions.courseName !== mockTestingCourse.courseName) {
        return Promise.resolve(null);
        }

        return Promise.resolve(null);
    }),

    findAll: jest.fn().mockImplementation(() => {
        return [mockTestingCourse];
    }),

    find: jest.fn().mockImplementation(() => {
        return [mockTestingCourse];
    }),

    findOne: jest.fn().mockImplementation((options: any) => {
        if (options.where && options.where.id === mockTestingCourse.id) {
        return { ...mockTestingCourse };
        }
        return null;
    }),

    update: jest.fn().mockImplementation((updateCourseRequest: UpdateCourseRequest) => {
        return { ...mockTestingCourse, ...updateCourseRequest };
    }),

    remove: jest.fn().mockImplementation((findOneCourseRequest: FindOneCourseRequest) => {
        return mockTestingCourse;
    }),
};
