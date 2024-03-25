import { LoginUserRequest } from "../interfaces/auth";
export declare class LoginUserDto implements LoginUserRequest {
    login: string;
    password: string;
}
