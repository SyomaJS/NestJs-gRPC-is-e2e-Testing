import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import { UpdateFileRequest } from "../globals/interfaces/file";

describe("Files (e2e)", () => {
  let app: INestApplication;
  let createdFileId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  //? Expecting succes while uploading file
  it("/files/upload (POST) --> SUCCESS -> 201", async () => {
    const filePath = path.join(__dirname, "./mocks/testing-file.png");
    const response = await request(app.getHttpServer())
      .post("/files/upload")
      .attach("file", filePath)
      .expect(201);

    createdFileId = response.body.id;
  });

  //? Expecting succes while finding all files
  it("/files/get-all (GET) --> SUCCESS -> (200)", async () => {
    await request(app.getHttpServer())
      .get("/files/get-all")
      .set("Content-Type", "multipart/form-data")
      .expect(200);
  });

  //? Expecting succes while finding a single file by ID
  it("/files/get/:id (GET) --> SUCCESS -> (200)", async () => {
    await request(app.getHttpServer())
      .get(`/files/get/${createdFileId}`)
      .set("Content-Type", "multipart/form-data")
      .expect(200);
  });

  //? Expecting succes while updating a file
  it("/files/update/:id (PUT) --> SUCCESS -> (200)", async () => {
    const updateFileRequest: Pick<UpdateFileRequest, "fileName"> = {
      fileName: "Updated File",
    };

    await request(app.getHttpServer())
      .put(`/files/update/${createdFileId}`)
      .set("Content-Type", "application/json")
      .send(updateFileRequest)
      .expect(200);
  });

  //? Expecting success while deleting file
  it("/files/delete/:id (DELETE) --> SUCCESS -> (200)", async () => {
    await request(app.getHttpServer())
      .delete(`/files/delete/${createdFileId}`)
      .set("Content-Type", "application/json")
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
    jest.resetAllMocks();
  });
});
