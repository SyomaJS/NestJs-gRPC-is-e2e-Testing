"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const files_module_1 = require("./files/files.module");
const courses_module_1 = require("./courses/courses.module");
const serve_static_1 = require("@nestjs/serve-static");
const users_module_1 = require("./users/users.module");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            files_module_1.FilesModule,
            courses_module_1.CoursesModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.resolve)(__dirname, "../globals", "media"),
                serveRoot: "globals/media",
                exclude: ["/media/index.html"],
            }),
        ],
        controllers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map