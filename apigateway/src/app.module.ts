import { Module } from "@nestjs/common";
import { FilesModule } from "./files/files.module";
import { CoursesModule } from "./courses/courses.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { UsersModule } from "./users/users.module";
import { resolve } from "path";


@Module({
  imports: [
    UsersModule,
    FilesModule,
    CoursesModule,

    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, "../globals", "media"),
      serveRoot: "globals/media",
      exclude: ["/media/index.html"],
    }),
  ],
  controllers: [],
})
export class AppModule {}
