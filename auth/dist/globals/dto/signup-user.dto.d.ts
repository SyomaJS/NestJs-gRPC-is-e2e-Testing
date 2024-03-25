import { CreateUserRequest } from '../interfaces/auth';
export declare class SignUpUserDto implements CreateUserRequest {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
}
