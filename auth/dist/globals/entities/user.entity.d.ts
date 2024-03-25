import { Course } from './course.entity';
import { User as IUserAttr } from '../interfaces/auth';
export declare class User implements IUserAttr {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    hashedPassword: string;
    isActive: boolean;
    courses: Course[];
}
