import { OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { UpdateFileRequest } from "../../globals/interfaces/file";
import { CreateFileDto } from "../../globals/dto/create-file.dto";
export declare class FilesController implements OnModuleInit {
    private readonly client;
    private filesService;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    create(createFileDto: CreateFileDto, file: any): Promise<import("../../globals/interfaces/file").File>;
    findAll(): Promise<import("../../globals/interfaces/file").File[]>;
    findOne(id: string): Promise<import("../../globals/interfaces/file").File>;
    update(id: string, updateFileRequest: UpdateFileRequest): Promise<import("../../globals/interfaces/file").File>;
    remove(id: string): Promise<{
        message: string;
    }>;
    private handleError;
}
