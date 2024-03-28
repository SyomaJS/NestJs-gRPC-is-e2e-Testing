import { Observable } from "rxjs";
export declare const protobufPackage = "auth";
export interface LogoutUserRequest {
    refreshToken: string;
}
export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
export interface LoginResponse {
    user: User | undefined;
    tokens: Tokens | undefined;
}
export interface PaginationRequest {
    page: number;
    skip: number;
}
export interface UpdateUserRequest {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
}
export interface FindOneUserRequest {
    id: number;
}
export interface Users {
    users: User[];
}
export interface Empty {
}
export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
}
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    hashedPassword: string;
    isActive: boolean;
}
export declare const AUTH_PACKAGE_NAME = "auth";
export interface UsersServiceClient {
    createUser(request: CreateUserRequest): Observable<User>;
    findAllUsers(request: Empty): Observable<Users>;
    findOneUser(request: FindOneUserRequest): Observable<User>;
    updateUser(request: UpdateUserRequest): Observable<User>;
    removeUser(request: FindOneUserRequest): Observable<User>;
    loginUser(request: CreateUserRequest): Observable<LoginResponse>;
    logoutUser(request: LogoutUserRequest): Observable<User>;
    queryUsers(request: Observable<PaginationRequest>): Observable<Users>;
}
export interface UsersServiceController {
    createUser(request: CreateUserRequest): Promise<User> | Observable<User> | User;
    findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;
    findOneUser(request: FindOneUserRequest): Promise<User> | Observable<User> | User;
    updateUser(request: UpdateUserRequest): Promise<User> | Observable<User> | User;
    removeUser(request: FindOneUserRequest): Promise<User> | Observable<User> | User;
    loginUser(request: CreateUserRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;
    logoutUser(request: LogoutUserRequest): Promise<User> | Observable<User> | User;
    queryUsers(request: Observable<PaginationRequest>): Observable<Users>;
}
export declare function UsersServiceControllerMethods(): (constructor: Function) => void;
export declare const USERS_SERVICE_NAME = "UsersService";
