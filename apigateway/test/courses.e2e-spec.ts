import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import * as cookieParser from "cookie-parser";
import { CreateCourseDto } from "../globals/dto";
import { UpdateCourseRequest } from "../globals/interfaces/course";

describe("Courses (e2e)", () => {
  let app: INestApplication;
  let createCourseDto: CreateCourseDto;
  let createdCourseId: number;
  let updateCourseDto: Pick<
    UpdateCourseRequest,
    "courseName" | "duration" | "price"
  >;

  //? Set and initialize the application
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();

    createCourseDto = {
      courseName: "NestJS Course",
      duration: 60,
      price: 1000,
    };
  });

  //? Expecting successful creation of the course
  it("/courses/create (POST) --> SUCCESS -> (201)", async () => {
    const { body } = await request(app.getHttpServer())
      .post("/courses/create")
      .set("Content-Type", "application/json")
      .send(createCourseDto)
      .expect(201);
    expect(body.courseName).toEqual(createCourseDto.courseName);

    createdCourseId = body.id;
  });

  //? Expecting successfull finding all courses
  it("/courses/get-all (GET) --> SUCCESS -> (200)", async () => {
    const { body } = await request(app.getHttpServer())
      .get("/courses/get-all")
      .set("Content-Type", "application/json")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBeGreaterThan(0);
  });

  //? Expecting successfully finding one course
  it("/courses/get/:id (GET) --> SUCCESS -> (200)", async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/courses/get/${createdCourseId}`)
      .set("Content-Type", "application/json")
      .expect(200);

    expect(body.courseName).toEqual(createCourseDto.courseName);
  });

  //? Expecting FAIL while finding one course
  it("/courses/get/:id (GET) --> FAIL -> (404)", async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/courses/get/${-1}`)
      .set("Content-Type", "application/json")
      .expect(404);
  });

  it("/courses/update/:id (PUT) --> SUCCESS -> (200)", async () => {
    updateCourseDto = {
      courseName: "Updated NestJS Course",
      duration: 80,
      price: 1200,
    };

    const { body } = await request(app.getHttpServer())
      .put(`/courses/update/${createdCourseId}`)
      .set("Content-Type", "application/json")
      .send(updateCourseDto)
      .expect(200);

    expect(body.courseName).toEqual(updateCourseDto.courseName);
    expect(body.duration).toEqual(updateCourseDto.duration);
    expect(body.price).toEqual(updateCourseDto.price);
  });

  //? Expecting deleting course
  it("/courses/delete/:id (DELETE) --> SUCCESS -> (200)", async () => {
    await request(app.getHttpServer())
      .delete(`/courses/delete/${createdCourseId}`)
      .set("Content-Type", "application/json")
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
    jest.resetAllMocks();
  });
});
