"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const file_1 = require("../../globals/interfaces/file");
const error_messages_1 = require("../../globals/errors/error-messages");
const create_file_dto_1 = require("../../globals/dto/create-file.dto");
const platform_express_1 = require("@nestjs/platform-express");
let FilesController = class FilesController {
    constructor(client) {
        this.client = client;
    }
    onModuleInit() {
        this.filesService =
            this.client.getService(file_1.FILE_SERVICE_NAME);
    }
    async create(createFileDto, file) {
        try {
            console.log(`File: `, file);
            const fileBuffer = file?.buffer;
            console.log(fileBuffer);
            const createFileRequest = {
                ...createFileDto,
                file: fileBuffer,
                fileType: file?.mimetype?.split("/")[1],
            };
            return await (0, rxjs_1.firstValueFrom)(this.filesService.createFile(createFileRequest));
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async findAll() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.filesService.findAllFiles({}));
            return response.files ? response.files : [];
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async findOne(id) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.filesService.findOneFile({ id: +id }));
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async update(id, updateFileRequest) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.filesService.updateFile({ id: +id, ...updateFileRequest }));
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async remove(id) {
        try {
            await (0, rxjs_1.firstValueFrom)(this.filesService.removeFile({ id: +id }));
            return { message: "Successfully deleted !" };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    handleError(error) {
        const statusCode = (0, error_messages_1.mapGrpcErrorToHttpStatus)(error.code);
        throw new common_1.HttpException(error.message, statusCode);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_dto_1.CreateFileDto, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("get-all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("get/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "remove", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)("files"),
    __param(0, (0, common_1.Inject)(file_1.FILE_SERVICE_NAME)),
    __metadata("design:paramtypes", [Object])
], FilesController);
//# sourceMappingURL=files.controller.js.map