import { User } from "./user.entity";
import { File } from "./file.entity";
export declare class Course {
    id: number;
    courseName: string;
    price: number;
    duration: number;
    files: File[];
    users: User[];
}
