import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { CreateUserRequest } from "../dist/globals/interfaces/auth.d";
import * as cookieParser from "cookie-parser";


describe("User (e2e)", () => {

  let app: INestApplication;
  let createUserRequest: CreateUserRequest;
  let createdUserId: number;
  let cookie: string;

  //? Set and initialize the application
  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();

    createUserRequest = {
      login: "syomaJs",
      password: "qwerty123",
      lastName: "Samandar",
      firstName: "Akramov",
    };

  });

  //?  Expecting success while signing up
  it("/users/signup (POST) --> SUCCESS -> (201)", async () => {

    const response = await request(app.getHttpServer())
      .post("/users/signup")
      .set("Content-Type", "application/json")
      .send(createUserRequest)
      .expect(201);

    expect(response.body?.login).toEqual(createUserRequest.login);

    createdUserId = response.body.id;
  });

  // ? Expecting success finding created user
  it("/users/get (GET) --> SUCCESS -> (200)", async () => {

    const response = await request(app.getHttpServer())
      .get(`/users/get/${createdUserId}`)
      .set("Content-Type", "application/json")
      .expect(200);

    expect(response.body?.login).toEqual(createUserRequest.login);
  });

  //? Expecting successful retrieval of all users
  it("/users/get-all (GET) --> SUCCESS -> (200)", async () => {

    const response = await request(app.getHttpServer())
      .get("/users/get-all")
      .set("Content-Type", "application/json")
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  //? Expecting a failed sign-up attempt
  it("/users/signup (POST) --> FAIL -> (409)", async () => {

    await request(app.getHttpServer())
      .post("/users/signup")
      .set("Content-Type", "application/json")
      .send(createUserRequest)
      .expect(409); // ALREADY_EXISTS

  });

  //? Expecting successful logging in
  it("/users/signin (POST) should log in a user and return tokens", async () => {

    const { body, headers } = await request(app.getHttpServer())
      .post("/users/signin")
      .set("Content-Type", "application/json")
      .send({
        login: createUserRequest.login,
        password: createUserRequest.password,
      })
      .expect(200);

    expect(body.user.login).toEqual(createUserRequest.login);

    expect(body).toHaveProperty("accessToken");
    expect(body.accessToken).toBeDefined();

    cookie = headers["set-cookie"];
  });

  //? Expecting successful logout
  it("/users/signout (POST) --> SUCCESS -> (200)", async () => {

    const logoutResponse = await request(app.getHttpServer())
      .post("/users/signout")
      .set("Cookie", cookie)
      .expect(200);

    expect(logoutResponse.body.message).toEqual("User successfully logged out");

  });

  //? Expecting successful deletion of the created user
  it("/users/delete (DELETE) --> SUCCESS -> (200)", async () => {

    const resp = await request(app.getHttpServer())
      .delete(`/users/delete/${createdUserId}`)
      .set("Content-Type", "application/json")
      .expect(200);

  });

  //? Expecting a failed sign-in attempt
  it("/users/signin (POST) should not log in and should return error", async () => {

    await request(app.getHttpServer())
      .post("/users/signin")
      .set("Content-Type", "application/json")
      .send({
        login: createUserRequest.login,
        password: "worng_password",
      })
      .expect(401);
      
  });

  afterAll(async () => {
    await app.close();
    jest.resetAllMocks();
  });
  
});
