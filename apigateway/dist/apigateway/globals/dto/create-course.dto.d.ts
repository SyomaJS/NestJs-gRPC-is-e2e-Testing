import { CreateCourseRequest } from '../interfaces/course';
export declare class CreateCourseDto implements CreateCourseRequest {
    courseName: string;
    price: number;
    duration: number;
}
