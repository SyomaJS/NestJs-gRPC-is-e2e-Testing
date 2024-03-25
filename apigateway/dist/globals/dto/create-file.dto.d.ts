import { CreateFileRequest } from '../interfaces/file';
export declare class CreateFileDto implements CreateFileRequest {
    fileName: string;
    file: any;
    fileType: string;
}
