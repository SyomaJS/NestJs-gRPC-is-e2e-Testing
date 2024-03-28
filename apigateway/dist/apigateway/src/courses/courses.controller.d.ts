import { OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { UpdateCourseRequest, SetCourseFileRequest } from "../../globals/interfaces/course";
import { CreateCourseDto } from "../../globals/dto/create-course.dto";
import { SetCourseFileDto } from "../../globals/dto/set-course-file.dto";
export declare class CoursesController implements OnModuleInit {
    private readonly client;
    private courseService;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    create(createCourseDto: CreateCourseDto): Promise<import("../../globals/interfaces/course").CreateCourseResponse>;
    findAll(): Promise<import("../../globals/interfaces/course").Course[]>;
    findOne(id: string): Promise<import("../../globals/interfaces/course").CreateCourseResponse>;
    update(id: string, updateCourseRequest: UpdateCourseRequest): Promise<import("../../globals/interfaces/course").CreateCourseResponse>;
    remove(id: string): Promise<import("../../globals/interfaces/course").CreateCourseResponse>;
    addFilesToCourse(setCourseFileDto: SetCourseFileDto): Promise<import("../../globals/interfaces/course").SetCourseFileResponse>;
    removeCourseFiles(setCourseFileDto: SetCourseFileRequest): Promise<import("../../globals/interfaces/course").SetCourseFileResponse>;
    private handleError;
}
