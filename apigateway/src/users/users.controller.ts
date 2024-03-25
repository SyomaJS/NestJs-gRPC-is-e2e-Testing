import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  OnModuleInit,
  Inject,
  Put,
  Res,
  HttpException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  USERS_SERVICE_NAME,
  UpdateUserRequest,
  UsersServiceClient,
} from "../../globals/interfaces/auth";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CookieGetter } from "../../globals/decorators/cookieGetter.decorator";
import { Request, Response } from "express";
import { mapGrpcErrorToHttpStatus } from "../../globals/errors/error-messages";
import { SignUpUserDto } from "../../globals/dto/signup-user.dto";
import { LoginUserDto } from "../../globals/dto/login-user.dto";

@Controller("users")
export class UsersController implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(
    @Inject(USERS_SERVICE_NAME) private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  @Post("signup")
  async create(@Body() signUpUserDto: SignUpUserDto) {
    try {
      const userData = await firstValueFrom(
        this.usersService.createUser(signUpUserDto)
      );
      return userData;
    } catch (error) {
      this.handleError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const userData = await firstValueFrom(
        this.usersService.loginUser(loginUserDto)
      );
      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return { user: userData.user, accessToken: userData.tokens.accessToken };
    } catch (error) {
      this.handleError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post("signout")
  async logout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      await firstValueFrom(this.usersService.logoutUser({ refreshToken }));
      res.clearCookie("refreshToken");
      return { message: "User successfully logged out" };
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get("get-all")
  async findAll() {
    try {
      const response = await firstValueFrom(
        this.usersService.findAllUsers(null)
      );

      return response.users ? response.users : [];
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get("get/:id")
  async findOne(@Param("id") id: string) {
    try {
      const user = await firstValueFrom(
        this.usersService.findOneUser({ id: +id })
      );
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Put("update/:id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserRequest
  ) {
    try {
      const updatedUser = await firstValueFrom(
        this.usersService.updateUser({ id: +id, ...updateUserDto })
      );
      return updatedUser;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Delete("delete/:id")
  async remove(@Param("id") id: string) {
    try {
      const user = await firstValueFrom(
        this.usersService.removeUser({ id: +id })
      );
      return { message: "User successfully deleted" };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    const statusCode = mapGrpcErrorToHttpStatus(error.code);
    throw new HttpException(error.message, statusCode);
  }
}
