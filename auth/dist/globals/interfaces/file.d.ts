import { Observable } from "rxjs";
export declare const protobufPackage = "file";
export interface PaginationRequest {
    page: number;
    skip: number;
}
export interface CreateFileResponse {
    id: number;
    fileName: string;
}
export interface UpdateFileRequest {
    id: number;
    fileName: string;
}
export interface FindOneFileRequest {
    id: number;
}
export interface Files {
    file: File[];
}
export interface Empty {
}
export interface CreateFileRequest {
    fileName: string;
    file: any;
    fileType: string;
}
export interface File {
    id: number;
    fileName: string;
}
export declare const FILE_PACKAGE_NAME = "file";
export interface FileServiceClient {
    createFile(request: CreateFileRequest): Observable<File>;
    findAllFiles(request: Empty): Observable<{
        files: File[];
    }>;
    findOneFile(request: FindOneFileRequest): Observable<File>;
    updateFile(request: UpdateFileRequest): Observable<File>;
    removeFile(request: FindOneFileRequest): Observable<File>;
    queryFile(request: Observable<PaginationRequest>): Observable<File>;
}
export interface FileServiceController {
    createFile(request: CreateFileRequest): Promise<CreateFileResponse> | Observable<CreateFileResponse> | CreateFileResponse;
    findAllFiles(request: Empty): Promise<File> | Observable<File> | File;
    findOneFile(request: FindOneFileRequest): Promise<File> | Observable<File> | File;
    updateFile(request: UpdateFileRequest): Promise<File> | Observable<File> | File;
    removeFile(request: FindOneFileRequest): Promise<File> | Observable<File> | File;
    queryFile(request: Observable<PaginationRequest>): Observable<File>;
}
export declare function FileServiceControllerMethods(): (constructor: Function) => void;
export declare const FILE_SERVICE_NAME = "FileService";
