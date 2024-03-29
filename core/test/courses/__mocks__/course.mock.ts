import { Course } from "../../../globals/entities/course.entity";
import { File } from "../../../globals/entities/file.entity";

export const mockTestingFile: File = {
  id: 1,
  fileName: 'Some file Name',
  filePath: 'some path',
  courses: [],
};

export const mockTestingCourse: Partial<Course> = {
  id: 1,
  courseName: 'Node Js Bootcamp',
  duration: 10,
  price: 2_000_000,
  files: [mockTestingFile],
};


