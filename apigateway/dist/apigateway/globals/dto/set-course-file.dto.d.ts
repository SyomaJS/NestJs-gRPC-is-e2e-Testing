import { SetCourseFileRequest } from '../interfaces/course';
export declare class SetCourseFileDto implements SetCourseFileRequest {
    courseId: number;
    fileIds: number[];
}
