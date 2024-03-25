import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  OnModuleInit,
  Inject,
  Body,
  Put,
  HttpException,
} from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import {
  COURSE_SERVICE_NAME,
  CourseServiceClient,
  UpdateCourseRequest,
  SetCourseFileRequest,
} from "../../globals/interfaces/course";
import { mapGrpcErrorToHttpStatus } from "../../globals/errors/error-messages";
import { CreateCourseDto } from "../../globals/dto/create-course.dto";
import { SetCourseFileDto } from "../../globals/dto/set-course-file.dto";

@Controller("courses")
export class CoursesController implements OnModuleInit {
  private courseService: CourseServiceClient;

  constructor(
    @Inject(COURSE_SERVICE_NAME) private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.courseService =
      this.client.getService<CourseServiceClient>(COURSE_SERVICE_NAME);
  }

  @Post("create")
  async create(@Body() createCourseDto: CreateCourseDto) {
    try {
      console.log(`Create course dto: `, createCourseDto);
      const course = await firstValueFrom(
        this.courseService.createCourse(createCourseDto)
      );
      return course;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get("get-all")
  async findAll() {
    try {
      const response = await firstValueFrom(
        this.courseService.findAllCourses({})
      );
      return response.courses ? response.courses : [];
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get("get/:id")
  async findOne(@Param("id") id: string) {
    try {
      const course = await firstValueFrom(
        this.courseService.findOneCourse({ id: +id })
      );

      console.log(course);
      return course;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Put("update/:id")
  async update(
    @Param("id") id: string,
    @Body() updateCourseRequest: UpdateCourseRequest
  ) {
    try {
      return await firstValueFrom(
        this.courseService.updateCourse({ id: +id, ...updateCourseRequest })
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  @Delete("delete/:id")
  async remove(@Param("id") id: string) {
    try {
      return await firstValueFrom(this.courseService.removeCourse({ id: +id }));
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post("set-course-files")
  async addFilesToCourse(@Body() setCourseFileDto: SetCourseFileDto) {
    try {
      return await firstValueFrom(
        this.courseService.setCourseFile(setCourseFileDto)
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  @Delete("remove-course-files")
  async removeCourseFiles(@Body() setCourseFileDto: SetCourseFileRequest) {
    try {
      return await firstValueFrom(
        this.courseService.removeFilesFromCourse(setCourseFileDto)
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    const statusCode = mapGrpcErrorToHttpStatus(error.code);
    throw new HttpException(error.message, statusCode);
  }
}
