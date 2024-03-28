"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const courses_controller_1 = require("./courses.controller");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const course_1 = require("../../globals/interfaces/course");
let CoursesModule = class CoursesModule {
};
exports.CoursesModule = CoursesModule;
exports.CoursesModule = CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: course_1.COURSE_SERVICE_NAME,
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        url: 'localhost:50052',
                        package: course_1.protobufPackage,
                        protoPath: (0, path_1.resolve)(__dirname, '../../globals/protos/course.proto'),
                    },
                },
            ]),
        ],
        controllers: [courses_controller_1.CoursesController],
        providers: [],
    })
], CoursesModule);
//# sourceMappingURL=courses.module.js.map