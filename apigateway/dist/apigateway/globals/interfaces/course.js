"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COURSE_SERVICE_NAME = exports.CourseServiceControllerMethods = exports.COURSE_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = 'course';
exports.COURSE_PACKAGE_NAME = 'course';
function CourseServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = [
            'createCourse',
            'findAllCourses',
            'findOneCourse',
            'updateCourse',
            'removeCourse',
        ];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)('CourseService', method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = ['queryCourse'];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)('CourseService', method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.CourseServiceControllerMethods = CourseServiceControllerMethods;
exports.COURSE_SERVICE_NAME = 'CourseService';
//# sourceMappingURL=course.js.map