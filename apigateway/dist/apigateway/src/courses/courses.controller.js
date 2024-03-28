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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const course_1 = require("../../globals/interfaces/course");
const error_messages_1 = require("../../globals/errors/error-messages");
const create_course_dto_1 = require("../../globals/dto/create-course.dto");
const set_course_file_dto_1 = require("../../globals/dto/set-course-file.dto");
let CoursesController = class CoursesController {
    constructor(client) {
        this.client = client;
    }
    onModuleInit() {
        this.courseService =
            this.client.getService(course_1.COURSE_SERVICE_NAME);
    }
    async create(createCourseDto) {
        try {
            console.log(`Create course dto: `, createCourseDto);
            const course = await (0, rxjs_1.firstValueFrom)(this.courseService.createCourse(createCourseDto));
            return course;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async findAll() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.courseService.findAllCourses({}));
            return response.courses ? response.courses : [];
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const course = await (0, rxjs_1.firstValueFrom)(this.courseService.findOneCourse({ id: +id }));
            console.log(course);
            return course;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async update(id, updateCourseRequest) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.courseService.updateCourse({ id: +id, ...updateCourseRequest }));
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async remove(id) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.courseService.removeCourse({ id: +id }));
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async addFilesToCourse(setCourseFileDto) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.courseService.setCourseFile(setCourseFileDto));
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async removeCourseFiles(setCourseFileDto) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.courseService.removeFilesFromCourse(setCourseFileDto));
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
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("get-all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("get/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("set-course-files"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_course_file_dto_1.SetCourseFileDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "addFilesToCourse", null);
__decorate([
    (0, common_1.Delete)("remove-course-files"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "removeCourseFiles", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)("courses"),
    __param(0, (0, common_1.Inject)(course_1.COURSE_SERVICE_NAME)),
    __metadata("design:paramtypes", [Object])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map